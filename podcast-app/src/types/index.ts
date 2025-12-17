// Enums
export enum Category {
  Technology = 'Technology',
  Business = 'Business',
  TrueCrime = 'True Crime',
  Comedy = 'Comedy',
  Education = 'Education',
  HealthFitness = 'Health & Fitness',
  News = 'News',
  Sports = 'Sports',
  Science = 'Science',
  History = 'History',
}

export enum PlaybackSpeed {
  Half = 0.5,
  Normal = 1,
  OneAndHalf = 1.5,
  Double = 2,
}

// Podcast and Episode types
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
  createdAt: string;
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

// Player state
export interface PlayerState {
  currentEpisode: Episode | null;
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: PlaybackSpeed;
  queue: Episode[];
  queueIndex: number;
}

// Library state
export interface LibraryState {
  subscribed: Set<string>;
  favorites: Set<string>;
  history: HistoryItem[];
}

export interface HistoryItem {
  episodeId: string;
  podcastId: string;
  timestamp: number;
  currentTime: number;
}

// Component Props
export interface PodcastCardProps {
  podcast: Podcast;
  onClick?: () => void;
  isSubscribed?: boolean;
  onSubscribeClick?: (e: React.MouseEvent) => void;
}

export interface EpisodeItemProps {
  episode: Episode;
  podcast: Podcast;
  onPlayClick: () => void;
  isPlaying?: boolean;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export interface CategoryPillProps {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface FilterOptions {
  category?: Category | null;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  sortBy: 'relevance' | 'rating' | 'recent';
}

export interface SearchState {
  query: string;
  results: Podcast[];
  filters: FilterOptions;
  isLoading: boolean;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// API-like responses (mock)
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
}
