export type Category =
  | 'Technology'
  | 'Business'
  | 'True Crime'
  | 'Comedy'
  | 'Education'
  | 'Health & Fitness'
  | 'News'
  | 'Sports'
  | 'Science'
  | 'History';

export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: Category[];
  episodeCount: number;
  subscribers: number;
  rating: number;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  duration: number; // seconds
  releaseDate: string; // ISO string
  audioUrl: string;
  episodeNumber: number;
  thumbnail?: string;
}
