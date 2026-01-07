import https from 'https';
import { promises as fs } from 'fs';

// Function to fetch HTML content from a URL
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '—',
    '&ndash;': '–',
    '&euro;': '€',
    '&nbsp;': ' ',
  };
  return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

// Function to extract comment article details from detail page
async function fetchCommentArticleDetails(url) {
  try {
    console.log(`  → Fetching comment article details from ${url}`);
    const html = await fetchPage(url);

    // Extract Category Name (sf-article-header__category)
    const categoryMatch = html.match(/<a[^>]*class="[^"]*sf-article-header__category[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    const categoryName = categoryMatch ? decodeHtmlEntities(categoryMatch[1].trim().replace(/<[^>]*>/g, '')) : '';

    // Extract Article Author (sf-author-bio__link)
    // The author is inside an <a> tag within <h4 class="sf-author-bio__link">
    let author = '';
    const authorBioMatch = html.match(/<h4[^>]*class="[^"]*sf-author-bio__link[^"]*"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    if (authorBioMatch) {
      author = decodeHtmlEntities(authorBioMatch[1].trim().replace(/<[^>]*>/g, ''));
    }
    // Fallback to article header author if bio author not found
    if (!author) {
      const authorHeaderMatch = html.match(/<a[^>]*class="[^"]*sf-article-header__author[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
      if (authorHeaderMatch) {
        author = decodeHtmlEntities(authorHeaderMatch[1].trim().replace(/<[^>]*>/g, ''));
      }
    }

    // Extract Article Date (sf-article-header__date)
    const dateMatch = html.match(/<time[^>]*class="[^"]*sf-article-header__date[^"]*"[^>]*>([\s\S]*?)<\/time>/i);
    const articleDate = dateMatch ? dateMatch[1].trim().replace(/<[^>]*>/g, '') : '';

    // Extract Header Title (sf-article-header__title)
    const titleMatch = html.match(/<h1[^>]*class="[^"]*sf-article-header__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
    const headerTitle = titleMatch ? decodeHtmlEntities(titleMatch[1].trim().replace(/<[^>]*>/g, '')) : '';

    // Extract Article Image (sf-article-header__image-container)
    let articleImage = '';
    const imageContainerMatch = html.match(/<div[^>]*class="[^"]*sf-article-header__image-container[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (imageContainerMatch) {
      const imageHtml = imageContainerMatch[1];
      // Try to find img src
      const imgSrcMatch = imageHtml.match(/<img[^>]*src="([^"]*)"/i);
      if (imgSrcMatch) {
        articleImage = imgSrcMatch[1].replace(/&amp;/g, '&');
      }
      // Try to find data-src (lazy loading)
      if (!articleImage) {
        const dataSrcMatch = imageHtml.match(/<img[^>]*data-src="([^"]*)"/i);
        if (dataSrcMatch) {
          articleImage = dataSrcMatch[1].replace(/&amp;/g, '&');
        }
      }
    }

    // Fallback to og:image if article image not found
    if (!articleImage) {
      const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
      if (ogImageMatch) {
        articleImage = ogImageMatch[1].replace(/&amp;/g, '&');
      }
    }

    // Extract Article Image Caption (sf-article-header__image-caption)
    let imageCaption = '';
    const captionMatch = html.match(/<p[^>]*class="[^"]*sf-article-header__image-caption[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    if (captionMatch) {
      imageCaption = decodeHtmlEntities(captionMatch[1].trim().replace(/<[^>]*>/g, ''));
    }

    // Extract Article Text (sf-article-content__text)
    let articleText = '';
    const contentStartMatch = html.match(/<div[^>]*class="[^"]*sf-article-content__text[^"]*"[^>]*>/i);
    if (contentStartMatch) {
      const startIndex = html.indexOf(contentStartMatch[0]) + contentStartMatch[0].length;

      // Find where the content section ends (before tags section)
      let endIndex = html.indexOf('<section class="sf-tags">', startIndex);
      if (endIndex === -1) endIndex = html.indexOf('</article>', startIndex);
      if (endIndex === -1) endIndex = startIndex + 100000; // Fallback

      const contentHtml = html.substring(startIndex, endIndex);

      // Extract all paragraphs from the content
      const paragraphMatches = contentHtml.matchAll(/<p[^>]*>([\s\S]*?)(?=<p|<div|<section|$)/gi);
      const paragraphs = [];

      for (const pMatch of paragraphMatches) {
        const paragraph = pMatch[1]
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<div[^>]*>[\s\S]*?<\/div>/gi, '') // Remove injected ads
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (paragraph && paragraph.length > 10) {
          paragraphs.push(decodeHtmlEntities(paragraph));
        }
      }

      articleText = paragraphs.join('\n\n');
    }

    // Extract Article Tags (sf-tags)
    const tags = [];
    const tagMatches = html.matchAll(/<a[^>]*class="[^"]*sf-tags__link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi);

    for (const tagMatch of tagMatches) {
      const tag = tagMatch[1].trim().replace(/<[^>]*>/g, '');
      if (tag) {
        tags.push(decodeHtmlEntities(tag));
      }
    }

    return {
      categoryName,
      author,
      articleDate,
      headerTitle,
      articleImage,
      imageCaption,
      articleText,
      tags
    };
  } catch (error) {
    console.error(`  ✗ Error fetching article details: ${error.message}`);
    return {
      categoryName: '',
      author: '',
      articleDate: '',
      headerTitle: '',
      articleImage: '',
      imageCaption: '',
      articleText: '',
      tags: []
    };
  }
}

// Function to extract comment article URLs from listing page
function extractCommentArticleUrls(html) {
  const urls = [];

  // Regex to match sf-card blocks and extract URLs
  const cardRegex = /<a class="sf-card__(?:title|image)-link" href="([^"]*)"/gi;
  const matches = html.matchAll(cardRegex);

  for (const match of matches) {
    const url = match[1];
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  }

  return urls;
}

// Main scraping function
async function scrapeCommentArticles(startPage = 1, endPage = 93) {
  const baseUrl = 'https://brusselssignal.eu/category/comment/';
  const allCommentArticles = [];

  console.log('Starting comment article scrape from Brussels Signal...\n');
  console.log(`Fetching comment articles from pages ${startPage} to ${endPage}.\n`);

  // Loop through all pages
  for (let page = startPage; page <= endPage; page++) {
    try {
      const pageUrl = page === 1 ? baseUrl : `${baseUrl}page/${page}/`;
      console.log(`\n📄 Fetching page ${page} (${pageUrl})...`);

      const html = await fetchPage(pageUrl);
      const articleUrls = extractCommentArticleUrls(html);

      console.log(`✓ Found ${articleUrls.length} comment articles on page ${page}`);

      if (articleUrls.length === 0) {
        console.log(`⚠ No articles found on page ${page}, stopping...`);
        break;
      }

      // Fetch detailed content for each article on this page
      for (let i = 0; i < articleUrls.length; i++) {
        const url = articleUrls[i];
        console.log(`  [${i + 1}/${articleUrls.length}] Processing: ${url.substring(0, 80)}...`);

        const details = await fetchCommentArticleDetails(url);

        const commentArticle = {
          url,
          categoryName: details.categoryName,
          author: details.author,
          articleDate: details.articleDate,
          headerTitle: details.headerTitle,
          articleImage: details.articleImage,
          imageCaption: details.imageCaption,
          articleText: details.articleText,
          tags: details.tags
        };

        allCommentArticles.push(commentArticle);

        // Be respectful - wait between article detail requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Wait between page requests
      console.log(`✓ Completed page ${page}. Total articles so far: ${allCommentArticles.length}`);
      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (error) {
      console.error(`✗ Error fetching page ${page}:`, error.message);
    }
  }

  console.log(`\n\n✓ Total comment articles scraped: ${allCommentArticles.length}`);
  console.log(`✓ Articles with titles: ${allCommentArticles.filter(a => a.headerTitle).length}`);
  console.log(`✓ Articles with authors: ${allCommentArticles.filter(a => a.author).length}`);
  console.log(`✓ Articles with text content: ${allCommentArticles.filter(a => a.articleText).length}`);
  console.log(`✓ Articles with images: ${allCommentArticles.filter(a => a.articleImage).length}`);
  console.log(`✓ Articles with image captions: ${allCommentArticles.filter(a => a.imageCaption).length}`);
  console.log(`✓ Articles with tags: ${allCommentArticles.filter(a => a.tags.length > 0).length}`);

  // Save to JSON file
  await fs.writeFile('output/comment-articles.json', JSON.stringify(allCommentArticles, null, 2));
  console.log('\n✓ Data saved to output/comment-articles.json');

  return allCommentArticles;
}

// Run the scraper for all pages (1 to 93)
scrapeCommentArticles(1, 93).catch(console.error);
