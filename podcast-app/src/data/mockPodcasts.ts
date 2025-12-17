import { Podcast, Episode, Category } from '../types';

export const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Tech Deep Dive',
    author: 'Sarah Chen & Mike Rodriguez',
    description: 'Exploring the latest technologies, startups, and innovation trends. Join us weekly for insightful conversations with industry experts.',
    coverImage: 'https://picsum.photos/400/400?random=1',
    category: [Category.Technology, Category.Business],
    episodeCount: 142,
    subscribers: 58000,
    rating: 4.8,
    createdAt: '2022-01-15',
  },
  {
    id: '2',
    title: 'Business Bytes',
    author: 'James Wilson',
    description: 'Weekly insights on entrepreneurship, leadership, and business strategies. Perfect for startup founders and corporate professionals.',
    coverImage: 'https://picsum.photos/400/400?random=2',
    category: [Category.Business],
    episodeCount: 98,
    subscribers: 42000,
    rating: 4.6,
    createdAt: '2022-03-20',
  },
  {
    id: '3',
    title: 'True Crime Files',
    author: 'Jessica Martinez',
    description: 'Investigating the most intriguing criminal cases from around the world. In-depth research and compelling storytelling.',
    coverImage: 'https://picsum.photos/400/400?random=3',
    category: [Category.TrueCrime],
    episodeCount: 76,
    subscribers: 125000,
    rating: 4.7,
    createdAt: '2021-06-10',
  },
  {
    id: '4',
    title: 'Laugh Out Loud',
    author: 'Danny Thompson & Alex Kim',
    description: 'Comedy podcast featuring hilarious conversations, funny stories, and comedic guests. Pure entertainment and laughter guaranteed.',
    coverImage: 'https://picsum.photos/400/400?random=4',
    category: [Category.Comedy],
    episodeCount: 215,
    subscribers: 89000,
    rating: 4.5,
    createdAt: '2020-11-05',
  },
  {
    id: '5',
    title: 'Learning Curve',
    author: 'Dr. Lisa Park',
    description: 'Educational content covering science, history, philosophy, and critical thinking. Perfect for lifelong learners.',
    coverImage: 'https://picsum.photos/400/400?random=5',
    category: [Category.Education, Category.Science],
    episodeCount: 187,
    subscribers: 67000,
    rating: 4.9,
    createdAt: '2022-02-14',
  },
  {
    id: '6',
    title: 'Fitness & Wellness',
    author: 'Coach Marcus',
    description: 'Expert advice on fitness, nutrition, mental health, and overall wellness. Transform your lifestyle with science-backed tips.',
    coverImage: 'https://picsum.photos/400/400?random=6',
    category: [Category.HealthFitness],
    episodeCount: 134,
    subscribers: 71000,
    rating: 4.6,
    createdAt: '2021-09-22',
  },
  {
    id: '7',
    title: 'Daily News Wrap-Up',
    author: 'Tom Anderson',
    description: 'Stay updated with the most important news stories of the day. Quick, concise, and comprehensive news coverage.',
    coverImage: 'https://picsum.photos/400/400?random=7',
    category: [Category.News],
    episodeCount: 412,
    subscribers: 156000,
    rating: 4.4,
    createdAt: '2020-01-01',
  },
  {
    id: '8',
    title: 'Sports Talk Central',
    author: 'David & Kevin',
    description: 'Covering all major sports, from football to basketball. In-depth analysis, player interviews, and fan discussions.',
    coverImage: 'https://picsum.photos/400/400?random=8',
    category: [Category.Sports],
    episodeCount: 289,
    subscribers: 98000,
    rating: 4.5,
    createdAt: '2021-04-08',
  },
  {
    id: '9',
    title: 'Science Simplified',
    author: 'Dr. Robert Hayes',
    description: 'Making complex scientific concepts accessible to everyone. From quantum physics to molecular biology.',
    coverImage: 'https://picsum.photos/400/400?random=9',
    category: [Category.Science, Category.Education],
    episodeCount: 112,
    subscribers: 54000,
    rating: 4.8,
    createdAt: '2022-05-11',
  },
  {
    id: '10',
    title: 'History Through Time',
    author: 'Dr. Amanda Foster',
    description: 'Fascinating historical stories and events that shaped our world. Educational and entertaining narratives from history.',
    coverImage: 'https://picsum.photos/400/400?random=10',
    category: [Category.History, Category.Education],
    episodeCount: 156,
    subscribers: 61000,
    rating: 4.7,
    createdAt: '2021-08-17',
  },
  {
    id: '11',
    title: 'Code & Coffee',
    author: 'Emma Richardson',
    description: 'For developers, by developers. Tips, tricks, best practices, and conversations about software development.',
    coverImage: 'https://picsum.photos/400/400?random=11',
    category: [Category.Technology, Category.Education],
    episodeCount: 198,
    subscribers: 73000,
    rating: 4.7,
    createdAt: '2021-10-03',
  },
  {
    id: '12',
    title: 'Mindful Living',
    author: 'Rachel Green',
    description: 'Meditation, mindfulness, mental health, and personal growth. Tools and techniques for a better life.',
    coverImage: 'https://picsum.photos/400/400?random=12',
    category: [Category.HealthFitness, Category.Education],
    episodeCount: 143,
    subscribers: 81000,
    rating: 4.8,
    createdAt: '2021-12-01',
  },
];

// Generate episodes for each podcast
const generateEpisodes = (podcastId: string, podcastTitle: string, count: number): Episode[] => {
  const episodes: Episode[] = [];
  const now = new Date();

  for (let i = count; i > 0; i--) {
    const daysAgo = i * 7;
    const releaseDate = new Date(now);
    releaseDate.setDate(releaseDate.getDate() - daysAgo);

    episodes.push({
      id: `episode-${podcastId}-${i}`,
      podcastId,
      title: `Episode ${i}: ${podcastTitle} - ${generateRandomEpisodeTitle()}`,
      description: generateRandomDescription(),
      duration: Math.floor(Math.random() * 3600) + 600, // 10 min to 60 min
      releaseDate: releaseDate.toISOString(),
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 5) + 1}.mp3`,
      episodeNumber: i,
      thumbnail: `https://picsum.photos/300/300?random=${podcastId}-${i}`,
    });
  }

  return episodes;
};

const generateRandomEpisodeTitle = (): string => {
  const titles = [
    'The Future of Technology',
    'Industry Insights',
    'Expert Interview',
    'Q&A Session',
    'Breaking News Analysis',
    'Trending Now',
    'Deep Dive',
    'Special Report',
    'Live Discussion',
    'Case Study',
    'Predictions & Trends',
    'Behind the Scenes',
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const generateRandomDescription = (): string => {
  const descriptions = [
    'In this episode, we discuss the latest developments and what they mean for you.',
    'Join our experts as they break down complex topics into actionable insights.',
    'A fascinating conversation about innovation and the future.',
    'We explore the challenges and opportunities ahead.',
    'Exclusive interview with industry leaders and thought leaders.',
    'Discover the trends that are shaping our world.',
    'Deep analysis of recent events and their impact.',
    'Listen in as we debate the hottest topics.',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Create episodes for all podcasts
export const mockEpisodes: Record<string, Episode[]> = {};
mockPodcasts.forEach((podcast) => {
  mockEpisodes[podcast.id] = generateEpisodes(
    podcast.id,
    podcast.title,
    podcast.episodeCount
  );
});

/**
 * Get all episodes for a podcast
 */
export const getPodcastEpisodes = (podcastId: string): Episode[] => {
  return mockEpisodes[podcastId] || [];
};

/**
 * Get a single podcast by ID
 */
export const getPodcastById = (id: string): Podcast | undefined => {
  return mockPodcasts.find((p) => p.id === id);
};

/**
 * Get a single episode by ID
 */
export const getEpisodeById = (episodeId: string): Episode | undefined => {
  for (const episodes of Object.values(mockEpisodes)) {
    const episode = episodes.find((e) => e.id === episodeId);
    if (episode) return episode;
  }
  return undefined;
};

/**
 * Search podcasts by query
 */
export const searchPodcasts = (query: string): Podcast[] => {
  const lowerQuery = query.toLowerCase();
  return mockPodcasts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.author.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filter podcasts by category
 */
export const filterPodcastsByCategory = (category: Category): Podcast[] => {
  return mockPodcasts.filter((p) => p.category.includes(category));
};

/**
 * Get all unique categories
 */
export const getAllCategories = (): Category[] => {
  return Object.values(Category);
};

/**
 * Get trending podcasts (sorted by subscribers)
 */
export const getTrendingPodcasts = (limit: number = 8): Podcast[] => {
  return [...mockPodcasts].sort((a, b) => b.subscribers - a.subscribers).slice(0, limit);
};

/**
 * Get top rated podcasts
 */
export const getTopRatedPodcasts = (limit: number = 8): Podcast[] => {
  return [...mockPodcasts].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

/**
 * Get recently added podcasts
 */
export const getRecentlyAddedPodcasts = (limit: number = 8): Podcast[] => {
  return [...mockPodcasts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};
