import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArticleDetail from '../components/ArticleDetail.tsx';
import PremiumArticleDetail from '../components/PremiumArticleDetail.tsx';
import VideoArticleDetail from '../components/VideoArticleDetail.tsx';
import PodcastArticleDetail from '../components/PodcastArticleDetail.tsx';
import { findArticleBySlug } from '../src/utils.ts';
import { MOST_READ, COMMENTARY, POLITICS, ECONOMY, SOCIETY, PHOTO_STORIES, WATCH_VIDEOS, FEATURED_ARTICLE, INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS } from '../src/data.ts';
import { VideoItem } from '../src/types.ts';

const ALL_ARTICLES = [...MOST_READ, ...COMMENTARY, ...POLITICS, ...ECONOMY, ...SOCIETY, ...PHOTO_STORIES, ...WATCH_VIDEOS, ...INTERFERENCE_PODCASTS, ...HORIZON_PODCASTS, ...HAMMER_TIME_PODCASTS, FEATURED_ARTICLE];

interface ArticlePageProps {
  type: 'article' | 'premium' | 'video' | 'podcast';
  onSignInClick: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ type, onSignInClick }) => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const article = findArticleBySlug(slug, ALL_ARTICLES);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  switch (type) {
    case 'premium':
      return <PremiumArticleDetail article={article} onSignInClick={onSignInClick} />;
    case 'video':
      return <VideoArticleDetail article={article as VideoItem} onRelatedVideoClick={() => {}} />;
    case 'podcast':
      return <PodcastArticleDetail article={article} />;
    default:
      return <ArticleDetail article={article} />;
  }
};

export default ArticlePage;
