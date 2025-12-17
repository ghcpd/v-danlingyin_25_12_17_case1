import { Podcast, Episode } from '../types'
import { Category } from '../types'

function pic(seed: number, w = 400, h = 400) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export const podcasts: Podcast[] = [
  {
    id: 'tech-talk',
    title: 'Tech Talk Weekly',
    author: 'Alex Johnson',
    description: 'A weekly deep dive into modern web technologies and software engineering practices.',
    coverImage: pic(1),
    category: [Category.Technology, Category.Education],
    episodeCount: 8,
    subscribers: 12000,
    rating: 4.7
  },
  {
    id: 'biz-insights',
    title: 'Business Insights',
    author: 'Market Lab',
    description: 'Interviews with startup founders and market analysts. Tips for entrepreneurs.',
    coverImage: pic(2),
    category: [Category.Business],
    episodeCount: 6,
    subscribers: 8000,
    rating: 4.5
  },
  {
    id: 'true-crime-files',
    title: 'True Crime Files',
    author: 'M. Carter',
    description: 'Investigative storytelling about real cases.',
    coverImage: pic(3),
    category: [Category.TrueCrime, Category.History],
    episodeCount: 10,
    subscribers: 22000,
    rating: 4.8
  },
  {
    id: 'laugh-out-loud',
    title: 'Laugh Out Loud',
    author: 'Comedy Crew',
    description: 'Standup clips and comedic interviews.',
    coverImage: pic(4),
    category: [Category.Comedy],
    episodeCount: 7,
    subscribers: 5000,
    rating: 4.2
  },
  {
    id: 'health-hub',
    title: 'Health Hub',
    author: 'Dr. Mehta',
    description: 'Evidence-based tips on health, fitness and mental well-being.',
    coverImage: pic(5),
    category: [Category.Health],
    episodeCount: 9,
    subscribers: 7500,
    rating: 4.6
  },
  {
    id: 'science-hour',
    title: 'Science Hour',
    author: 'LabCast',
    description: 'Exploring the latest discoveries in science and research.',
    coverImage: pic(6),
    category: [Category.Science, Category.Education],
    episodeCount: 5,
    subscribers: 6400,
    rating: 4.4
  },
  {
    id: 'daily-news',
    title: 'Daily News Digest',
    author: 'Global Desk',
    description: 'A concise daily briefing on world events.',
    coverImage: pic(7),
    category: [Category.News],
    episodeCount: 12,
    subscribers: 30000,
    rating: 4.3
  },
  {
    id: 'sports-zone',
    title: 'Sports Zone',
    author: 'The Athletes',
    description: 'Match recaps, analysis and interviews with sports figures.',
    coverImage: pic(8),
    category: [Category.Sports],
    episodeCount: 6,
    subscribers: 4200,
    rating: 4.1
  },
  {
    id: 'history-now',
    title: 'History Now',
    author: 'Time Capsule',
    description: 'Narratives from the past that shaped the present.',
    coverImage: pic(9),
    category: [Category.History, Category.Education],
    episodeCount: 8,
    subscribers: 8900,
    rating: 4.6
  },
  {
    id: 'startup-stories',
    title: 'Startup Stories',
    author: 'Founders',
    description: 'First-hand stories from entrepreneurs.',
    coverImage: pic(10),
    category: [Category.Business, Category.Technology],
    episodeCount: 6,
    subscribers: 11000,
    rating: 4.5
  },
  {
    id: 'education-corner',
    title: 'Education Corner',
    author: 'Professor Lane',
    description: 'Lessons and discussions on pedagogy and modern learning.',
    coverImage: pic(11),
    category: [Category.Education],
    episodeCount: 5,
    subscribers: 3400,
    rating: 4.0
  },
  {
    id: 'mindful-moments',
    title: 'Mindful Moments',
    author: 'Calm Studio',
    description: 'Guided meditation and wellness episodes.',
    coverImage: pic(12),
    category: [Category.Health],
    episodeCount: 5,
    subscribers: 6600,
    rating: 4.7
  }
]

export const episodes: Episode[] = podcasts.flatMap((p, pIndex) => {
  const episodesForPodcast: Episode[] = []
  for (let i = 1; i <= Math.max(5, p.episodeCount); i++) {
    episodesForPodcast.push({
      id: `${p.id}-ep-${i}`,
      podcastId: p.id,
      title: `${p.title} Episode ${i}`,
      description: `This is a description for episode ${i} of ${p.title}.`,
      duration: 300 + (i % 10) * 60, // between 300-840s
      releaseDate: new Date(Date.now() - i * 86400000).toISOString(),
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-0${(i % 9) + 1}.mp3`,
      episodeNumber: i,
      thumbnail: p.coverImage
    })
  }
  return episodesForPodcast
})
