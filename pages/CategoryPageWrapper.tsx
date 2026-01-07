import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import CategoryPage from '../components/CategoryPage.tsx';
import PodcastCategoryPage from '../components/PodcastCategoryPage.tsx';
import { POLITICS, ECONOMY, SOCIETY, COMMENTARY, PHOTO_STORIES, WATCH_VIDEOS } from '../src/data.ts';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

const CategoryPageWrapper: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const getCategoryArticles = (cat: string): NewsItem[] => {
    const normalized = cat.toLowerCase();
    let articles: NewsItem[] = [];

    if (normalized === 'politics') articles = POLITICS;
    else if (normalized === 'economy') articles = ECONOMY;
    else if (normalized === 'society') articles = SOCIETY;
    else if (normalized === 'commentary') articles = COMMENTARY;
    else if (normalized === 'photo-stories') articles = PHOTO_STORIES;
    else if (normalized === 'videos') articles = WATCH_VIDEOS;

    // Limit to 20 articles per page
    return articles.slice(0, 20);
  };

  const getCategoryName = (cat: string): string => {
    const normalized = cat.toLowerCase();
    if (normalized === 'photo-stories') return 'Photo Stories';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const navigateToArticle = (article: NewsItem) => {
    const slug = createSlug(article.title);
    if (article.premium) {
      navigate(`/premium/${slug}`);
    } else if (article.podcastSeries) {
      navigate(`/podcast/${slug}`);
    } else if (article.category?.toLowerCase() === 'videos' || 'duration' in article) {
      navigate(`/video/${slug}`);
    } else {
      navigate(`/article/${slug}`);
    }
    window.scrollTo(0, 0);
  };

  if (category.toLowerCase() === 'podcasts') {
    return <PodcastCategoryPage onPodcastClick={navigateToArticle} />;
  }

  const articles = getCategoryArticles(category);
  const categoryName = getCategoryName(category);

  return (
    <CategoryPage
      categoryName={categoryName}
      articles={articles}
      onArticleClick={navigateToArticle}
    />
  );
};

export default CategoryPageWrapper;
