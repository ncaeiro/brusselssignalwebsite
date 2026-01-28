import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AuthorPage from '../components/AuthorPage.tsx';
import { ALL_ARTICLES } from '../src/data.ts';

const AuthorPageWrapper: React.FC = () => {
  const { authorSlug } = useParams<{ authorSlug: string }>();

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

  return (
    <AuthorPage
      authorName={authorName}
      articles={authorArticles}
    />
  );
};

export default AuthorPageWrapper;
