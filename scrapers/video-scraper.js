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

// Function to extract video article details from detail page
async function fetchVideoArticleDetails(url) {
  try {
    console.log(`  → Fetching video article details from ${url}`);
    const html = await fetchPage(url);

    // Extract Category Name (sf-article-header__category)
    const categoryMatch = html.match(/<a[^>]*class="[^"]*sf-article-header__category[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    const categoryName = categoryMatch ? decodeHtmlEntities(categoryMatch[1].trim().replace(/<[^>]*>/g, '')) : '';

    // Extract Header Date (sf-article-header__date)
    const dateMatch = html.match(/<time[^>]*class="[^"]*sf-article-header__date[^"]*"[^>]*>([\s\S]*?)<\/time>/i);
    const headerDate = dateMatch ? dateMatch[1].trim().replace(/<[^>]*>/g, '') : '';

    // Extract Header Title (sf-article-header__title)
    const titleMatch = html.match(/<h1[^>]*class="[^"]*sf-article-header__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
    const headerTitle = titleMatch ? decodeHtmlEntities(titleMatch[1].trim().replace(/<[^>]*>/g, '')) : '';

    // Extract Article Video Image (sf-article-header__video)
    // Extract both video URL and thumbnail image
    let videoUrl = '';
    let videoImage = '';

    // Get video URL from sf-article-header__video section
    const videoSectionMatch = html.match(/<div[^>]*class="[^"]*sf-article-header__video[^"]*"[^>]*data-embed='([\s\S]*?)'>/i);
    if (videoSectionMatch) {
      const embedData = videoSectionMatch[1];
      // Try to find YouTube URL from iframe
      const youtubeMatch = embedData.match(/(?:data-src-cmplz|src)="([^"]*youtube\.com[^"]*)"/i);
      if (youtubeMatch) {
        videoUrl = youtubeMatch[1].replace(/&amp;/g, '&');
      }
    }

    // If video URL not found in data-embed, try finding it in article content
    if (!videoUrl) {
      const iframeMatch = html.match(/<iframe[^>]*(?:data-src-cmplz|src)="([^"]*youtube\.com[^"]*)"/i);
      if (iframeMatch) {
        videoUrl = iframeMatch[1].replace(/&amp;/g, '&');
      }
    }

    // Get video thumbnail from og:image meta tag (best quality)
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
    if (ogImageMatch) {
      videoImage = ogImageMatch[1].replace(/&amp;/g, '&');
    }

    // Fallback to twitter:image if og:image not found
    if (!videoImage) {
      const twitterImageMatch = html.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"/i);
      if (twitterImageMatch) {
        videoImage = twitterImageMatch[1].replace(/&amp;/g, '&');
      }
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

    // Extract Article Author (sf-card__author)
    // Author appears in multiple places, try article header first
    let author = '';
    const authorHeaderMatch = html.match(/<a[^>]*class="[^"]*sf-article-header__author[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    if (authorHeaderMatch) {
      author = decodeHtmlEntities(authorHeaderMatch[1].trim().replace(/<[^>]*>/g, ''));
    }
    // Fallback to card author if header author not found
    if (!author) {
      const authorCardMatch = html.match(/<a[^>]*class="[^"]*sf-card__author-link[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
      if (authorCardMatch) {
        author = decodeHtmlEntities(authorCardMatch[1].trim().replace(/<[^>]*>/g, ''));
      }
    }

    return {
      categoryName,
      headerDate,
      headerTitle,
      videoUrl,
      videoImage,
      articleText,
      tags,
      author
    };
  } catch (error) {
    console.error(`  ✗ Error fetching article details: ${error.message}`);
    return {
      categoryName: '',
      headerDate: '',
      headerTitle: '',
      videoUrl: '',
      videoImage: '',
      articleText: '',
      tags: [],
      author: ''
    };
  }
}

// Function to extract video article URLs from listing page
function extractVideoArticleUrls(html) {
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
async function scrapeVideoArticles(startPage = 1, endPage = 14) {
  const baseUrl = 'https://brusselssignal.eu/category/video/';
  const allVideoArticles = [];

  console.log('Starting video article scrape from Brussels Signal...\n');
  console.log(`Fetching video articles from pages ${startPage} to ${endPage}.\n`);

  // Loop through all pages
  for (let page = startPage; page <= endPage; page++) {
    try {
      const pageUrl = page === 1 ? baseUrl : `${baseUrl}page/${page}/`;
      console.log(`\n📄 Fetching page ${page} (${pageUrl})...`);

      const html = await fetchPage(pageUrl);
      const articleUrls = extractVideoArticleUrls(html);

      console.log(`✓ Found ${articleUrls.length} video articles on page ${page}`);

      if (articleUrls.length === 0) {
        console.log(`⚠ No articles found on page ${page}, stopping...`);
        break;
      }

      // Fetch detailed content for each article on this page
      for (let i = 0; i < articleUrls.length; i++) {
        const url = articleUrls[i];
        console.log(`  [${i + 1}/${articleUrls.length}] Processing: ${url.substring(0, 80)}...`);

        const details = await fetchVideoArticleDetails(url);

        const videoArticle = {
          url,
          categoryName: details.categoryName,
          headerDate: details.headerDate,
          headerTitle: details.headerTitle,
          videoUrl: details.videoUrl,
          videoImage: details.videoImage,
          articleText: details.articleText,
          tags: details.tags,
          author: details.author
        };

        allVideoArticles.push(videoArticle);

        // Be respectful - wait between article detail requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Wait between page requests
      console.log(`✓ Completed page ${page}. Total articles so far: ${allVideoArticles.length}`);
      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (error) {
      console.error(`✗ Error fetching page ${page}:`, error.message);
    }
  }

  console.log(`\n\n✓ Total video articles scraped: ${allVideoArticles.length}`);
  console.log(`✓ Articles with titles: ${allVideoArticles.filter(a => a.headerTitle).length}`);
  console.log(`✓ Articles with text content: ${allVideoArticles.filter(a => a.articleText).length}`);
  console.log(`✓ Articles with tags: ${allVideoArticles.filter(a => a.tags.length > 0).length}`);
  console.log(`✓ Articles with video URLs: ${allVideoArticles.filter(a => a.videoUrl).length}`);
  console.log(`✓ Articles with video images: ${allVideoArticles.filter(a => a.videoImage).length}`);
  console.log(`✓ Articles with authors: ${allVideoArticles.filter(a => a.author).length}`);

  // Save to JSON file
  await fs.writeFile('output/video-articles.json', JSON.stringify(allVideoArticles, null, 2));
  console.log('\n✓ Data saved to output/video-articles.json');

  return allVideoArticles;
}

// Run the scraper for all pages (1 to 14)
scrapeVideoArticles(1, 14).catch(console.error);
