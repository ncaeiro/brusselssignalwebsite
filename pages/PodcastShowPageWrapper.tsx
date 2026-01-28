import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PodcastShowPage from '../components/PodcastShowPage.tsx';
import { INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS } from '../src/data.ts';

const PodcastShowPageWrapper: React.FC = () => {
  const { showSlug } = useParams<{ showSlug: string }>();

  if (!showSlug) {
    return <Navigate to="/category/videos-filtered" replace />;
  }

  // Get podcast show details based on slug
  const getPodcastShowDetails = () => {
    const normalized = showSlug.toLowerCase();

    if (normalized === 'interference') {
      return {
        showName: 'Interference',
        showSlug: 'interference',
        hosts: 'Justin Stares & Alexandra Phillips',
        description: 'Tackling the most controversial topics in European politics with unfiltered honesty.',
        episodes: INTERFERENCE_PODCASTS,
        colorClass: 'text-[#EE6260]',
        bgClass: 'bg-[#eb6761]',
        logo: 'images/interference-podcast-logo.png',
      };
    } else if (normalized === 'horizon-podcast' || normalized === 'horizon') {
      return {
        showName: 'Horizon Podcast',
        showSlug: 'horizon-podcast',
        hosts: 'Ralph Schoellhammer',
        description: 'Exploring the future of the continent and the strategic signals on the horizon.',
        episodes: HORIZON_PODCASTS,
        colorClass: 'text-blue-600',
        bgClass: 'bg-[#1a2a44]',
        logo: 'images/horizon-podcast-logo.png',
      };
    } else if (normalized === 'hammer-time' || normalized === 'hammertime') {
      return {
        showName: 'Hammer Time',
        showSlug: 'hammer-time',
        hosts: 'Ralph Schoellhammer',
        description: 'Hard-hitting, direct analysis of current events with a sharp focus on bureaucratic failure.',
        episodes: HAMMER_TIME_PODCASTS,
        colorClass: 'text-orange-600',
        bgClass: 'bg-[#24375a]',
        logo: 'images/horizon-podcast-logo.png',
      };
    }

    return null;
  };

  const podcastDetails = getPodcastShowDetails();

  if (!podcastDetails) {
    return <Navigate to="/category/videos-filtered" replace />;
  }

  return <PodcastShowPage {...podcastDetails} />;
};

export default PodcastShowPageWrapper;
