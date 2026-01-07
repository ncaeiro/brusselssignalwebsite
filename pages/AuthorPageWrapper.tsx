import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import AuthorPage from '../components/AuthorPage.tsx';
import { ALL_ARTICLES } from '../src/data.ts';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

const AuthorPageWrapper: React.FC = () => {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const navigate = useNavigate();

  if (!authorSlug) {
    return <Navigate to="/" replace />;
  }

  // Convert slug back to author name (replace hyphens with spaces and capitalize)
  const authorName = authorSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get all articles by this author
  const authorArticles = ALL_ARTICLES.filter(
    article => article.author?.toLowerCase() === authorName.toLowerCase()
  );

  // If no articles found, redirect to home
  if (authorArticles.length === 0) {
    return <Navigate to="/" replace />;
  }

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

  return (
    <AuthorPage
      authorName={authorName}
      articles={authorArticles}
      onArticleClick={navigateToArticle}
    />
  );
};

export default AuthorPageWrapper;
