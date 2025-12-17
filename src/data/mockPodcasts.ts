import { Podcast, Episode, Category } from '../types'

const SAMPLE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export const podcasts: Podcast[] = [
  {
    id: 'p1',
    title: 'Tech Tomorrow',
    author: 'A. Rivera',
    description: 'A weekly deep-dive into emerging tech, interviews and product reviews.',
    coverImage: 'https://picsum.photos/seed/tech/400/400',
    category: [Category.Technology, Category.Science],
    episodeCount: 8,
    subscribers: 12400,
    rating: 4.7
  },
  {
    id: 'p2',
    title: 'Business Brief',
    author: 'M. Chen',
    description: 'Short episodes covering market moves and startup lessons.',
    coverImage: 'https://picsum.photos/seed/business/400/400',
    category: [Category.Business, Category.News],
    episodeCount: 12,
    subscribers: 8200,
    rating: 4.3
  },
  {
    id: 'p3',
    title: 'Laugh Lines',
    author: 'Various Comedians',
    description: 'A comedy variety show with sketches and interviews.',
    coverImage: 'https://picsum.photos/seed/comedy/400/400',
    category: [Category.Comedy],
    episodeCount: 20,
    subscribers: 54000,
    rating: 4.8
  },
  {
    id: 'p4',
    title: 'History Unfolded',
    author: 'D. Kapoor',
    description: 'Narrated stories from world history and forgotten events.',
    coverImage: 'https://picsum.photos/seed/history/400/400',
    category: [Category.History, Category.Education],
    episodeCount: 10,
    subscribers: 9400,
    rating: 4.6
  },
  {
    id: 'p5',
    title: 'Health Matters',
    author: 'Dr. Lee',
    description: 'Practical health, fitness and wellness tips backed by science.',
    coverImage: 'https://picsum.photos/seed/health/400/400',
    category: [Category.Health],
    episodeCount: 9,
    subscribers: 6100,
    rating: 4.4
  },
  {
    id: 'p6',
    title: 'True Crime Files',
    author: 'Investigations HQ',
    description: 'Carefully researched true crime stories and cold cases.',
    coverImage: 'https://picsum.photos/seed/crime/400/400',
    category: [Category.TrueCrime],
    episodeCount: 14,
    subscribers: 72000,
    rating: 4.9
  },
  {
    id: 'p7',
    title: 'Science Weekly',
    author: 'The Labs',
    description: 'Episode discussions about discoveries, papers and experiments.',
    coverImage: 'https://picsum.photos/seed/science/400/400',
    category: [Category.Science, Category.Education],
    episodeCount: 11,
    subscribers: 4300,
    rating: 4.2
  },
  {
    id: 'p8',
    title: 'Sports Centerline',
    author: 'J. Gomez',
    description: 'Recaps, deep-dive interviews and tactics from the sports world.',
    coverImage: 'https://picsum.photos/seed/sports/400/400',
    category: [Category.Sports, Category.News],
    episodeCount: 7,
    subscribers: 3200,
    rating: 4.1
  },
  {
    id: 'p9',
    title: 'EduCast',
    author: 'K. Patel',
    description: 'Short explainers for curious minds — history, math and more.',
    coverImage: 'https://picsum.photos/seed/educast/400/400',
    category: [Category.Education],
    episodeCount: 16,
    subscribers: 2900,
    rating: 4.0
  },
  {
    id: 'p10',
    title: 'Morning News Roundup',
    author: 'Daily Desk',
    description: 'Fast, factual news to start your day.',
    coverImage: 'https://picsum.photos/seed/news/400/400',
    category: [Category.News],
    episodeCount: 30,
    subscribers: 150000,
    rating: 4.5
  },
  {
    id: 'p11',
    title: 'Startup Stories',
    author: 'Founders Club',
    description: 'Founders share how they launched and scaled their startups.',
    coverImage: 'https://picsum.photos/seed/startup/400/400',
    category: [Category.Business, Category.Technology],
    episodeCount: 13,
    subscribers: 22000,
    rating: 4.6
  },
  {
    id: 'p12',
    title: 'Fit & Focused',
    author: 'Coach M',
    description: 'Workouts, nutrition and mental focus for busy people.',
    coverImage: 'https://picsum.photos/seed/fitness/400/400',
    category: [Category.Health, Category.Sports],
    episodeCount: 6,
    subscribers: 4800,
    rating: 4.3
  }
]

export const episodes: Episode[] = []

// generate 6-10 episodes per podcast
podcasts.forEach((p, idx) => {
  const count = Math.max(5, Math.min(10, p.episodeCount))
  for (let i = 1; i <= count; i++) {
    const ep: Episode = {
      id: `${p.id}-e${i}`,
      podcastId: p.id,
      title: `${p.title} — Episode ${i}`,
      description: `Episode ${i} of ${p.title}. A concise discussion about ${p.category[0]} topics and insights.`,
      duration: 600 + (i * 60),
      releaseDate: new Date(Date.now() - i * 86400000 * (idx + 1)).toISOString(),
      audioUrl: SAMPLE_AUDIO,
      episodeNumber: i,
      thumbnail: `https://picsum.photos/seed/${p.id}-${i}/200/200`
    }
    episodes.push(ep)
  }
})

export default { podcasts, episodes }
