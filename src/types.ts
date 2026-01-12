
export interface NewsItem {
  id: string;
  title: string;
  category?: 'Politics' | 'Economy' | 'Society' | 'World' | 'Commentary' | 'Photo Stories' | 'Videos' | 'News' | string;
  date: string;
  imageUrl: string;
  author?: string;
  premium?: boolean;
  summary?: string;
  url?: string;
  fullContent?: string;
  tags?: string[];
  podcastSeries?: 'Interference' | 'Horizon Podcast' | 'Hammer Time';
}

export interface VideoItem extends NewsItem {
  duration?: string;
}
