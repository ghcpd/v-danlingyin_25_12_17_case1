export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: string[];
  episodeCount: number;
  subscribers: number;
  rating: number;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  duration: number; // in seconds
  releaseDate: string;
  audioUrl: string;
  episodeNumber: number;
  thumbnail?: string;
}

export interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Episode[];
}

export interface LibraryState {
  subscribedPodcasts: string[]; // podcast ids
  favorites: string[]; // episode ids
  history: string[]; // episode ids
}

export enum Category {
  Technology = 'Technology',
  Business = 'Business',
  Comedy = 'Comedy',
  Education = 'Education',
  Health = 'Health',
  TrueCrime = 'True Crime',
  News = 'News',
  Sports = 'Sports',
  Science = 'Science',
  History = 'History',
}

export type SortOption = 'relevance' | 'rating' | 'recent';

export type FilterOptions = {
  category?: Category;
  duration?: 'short' | 'medium' | 'long';
  rating?: number;
};