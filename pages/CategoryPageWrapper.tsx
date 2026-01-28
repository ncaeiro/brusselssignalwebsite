import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CategoryPage from '../components/CategoryPage.tsx';
import PodcastCategoryPage from '../components/PodcastCategoryPage.tsx';
import VideosAndPodcastsPage from '../components/VideosAndPodcastsPage.tsx';
import FilteredVideosAndPodcastsPage from '../components/FilteredVideosAndPodcastsPage.tsx';
import { POLITICS, ECONOMY, SOCIETY, WORLD, COMMENTARY, PHOTO_STORIES, WATCH_VIDEOS } from '../src/data.ts';
import { NewsItem } from '../src/types.ts';

interface CategoryPageWrapperProps {
  useFilteredVideos?: boolean;
}

const CategoryPageWrapper: React.FC<CategoryPageWrapperProps> = ({ useFilteredVideos = false }) => {
  const { category, tag } = useParams<{ category: string; tag?: string }>();

  // Use filtered videos page when explicitly requested
  if (useFilteredVideos) {
    return <FilteredVideosAndPodcastsPage />;
  }

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const getCategoryArticles = (cat: string): NewsItem[] => {
    const normalized = cat.toLowerCase();
    let articles: NewsItem[] = [];

    if (normalized === 'politics') articles = POLITICS;
    else if (normalized === 'economy') articles = ECONOMY;
    else if (normalized === 'society') articles = SOCIETY;
    else if (normalized === 'world') articles = WORLD;
    else if (normalized === 'commentary') articles = COMMENTARY;
    else if (normalized === 'photo-stories') articles = PHOTO_STORIES;
    else if (normalized === 'videos') articles = WATCH_VIDEOS;
    else if (normalized === 'news') {
      // Mix articles from different categories for broad news coverage
      const politicsArticles = POLITICS.slice(0, 5);
      const economyArticles = ECONOMY.slice(0, 5);
      const societyArticles = SOCIETY.slice(0, 5);
      const worldArticles = WORLD.slice(0, 5);
      articles = [...politicsArticles, ...economyArticles, ...societyArticles, ...worldArticles];
    }

    // Limit to 20 articles per page
    return articles.slice(0, 20);
  };

  const getCategoryName = (cat: string): string => {
    const normalized = cat.toLowerCase();
    if (normalized === 'photo-stories') return 'Photo Stories';
    if (normalized === 'commentary') return 'Opinion';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  if (category.toLowerCase() === 'podcasts') {
    return <PodcastCategoryPage />;
  }

  if (category.toLowerCase() === 'videos') {
    return <VideosAndPodcastsPage />;
  }

  let articles = getCategoryArticles(category);
  const categoryName = getCategoryName(category);

  // Filter by tag if provided
  if (tag) {
    const tagLower = tag.toLowerCase().replace(/^#/, ''); // Remove # if present
    const tagNormalized = tagLower.replace(/-/g, ' '); // Convert 'eu-bubble' to 'eu bubble'

    articles = articles.filter(article => {
      // Check tags array (normalize both sides for comparison)
      const hasMatchingTag = article.tags?.some(t => {
        const articleTagNormalized = t.toLowerCase().replace(/-/g, ' ');
        return articleTagNormalized === tagNormalized ||
               articleTagNormalized.includes(tagNormalized) ||
               tagNormalized.includes(articleTagNormalized);
      });

      // Also check title and content as fallback
      const titleMatch = article.title.toLowerCase().includes(tagNormalized);
      const contentMatch = article.fullContent?.toLowerCase().includes(tagNormalized);

      return hasMatchingTag || titleMatch || contentMatch;
    });
  }

  return (
    <CategoryPage
      categoryName={categoryName}
      articles={articles}
      activeTag={tag}
    />
  );
};

export default CategoryPageWrapper;
