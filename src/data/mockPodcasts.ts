import { Podcast, Episode, Category } from "../types/index";

const sampleCover = (id: number) => `https://picsum.photos/seed/podcast${id}/400/400`;
const sampleThumbnail = (id: number) => `https://picsum.photos/seed/episode${id}/200/200`;

const categories: Category[] = [
  'Technology',
  'Business',
  'True Crime',
  'Comedy',
  'Education',
  'Health & Fitness',
  'News',
  'Sports',
  'Science',
  'History'
];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateEpisodes = (podcastId: string, count: number): Episode[] => {
  const episodes: Episode[] = [];
  for (let i = 1; i <= count; i++) {
    episodes.push({
      id: `${podcastId}-ep${i}`,
      podcastId,
      title: `Episode ${i} - ${(Math.random() + 1).toString(36).slice(2, 8)}`,
      description: `Description for episode ${i} of podcast ${podcastId}`,
      duration: randomInt(300, 3600), // 5 min - 60 min
      releaseDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      episodeNumber: i,
      thumbnail: sampleThumbnail(randomInt(1, 1000))
    });
  }
  return episodes;
};

export const mockPodcasts: Podcast[] = Array.from({ length: 12 }, (_, idx) => {
  const id = `pod${idx + 1}`;
  const count = randomInt(5, 10);
  const selectedCategories = [categories[randomInt(0, categories.length - 1)]];
  if (Math.random() < 0.4) {
    // add another category
    selectedCategories.push(categories[randomInt(0, categories.length - 1)]);
  }
  const episodes = generateEpisodes(id, count);
  return {
    id,
    title: `Podcast ${idx + 1} - ${id}`,
    author: `Author ${idx + 1}`,
    description: `This is a mock description for podcast ${idx + 1}. It covers ${selectedCategories.join(', ')} topics and has ${count} episodes.`,
    coverImage: sampleCover(idx + 1),
    category: selectedCategories,
    episodeCount: episodes.length,
    subscribers: randomInt(100, 1000000),
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // episodes not included in Podcast type; episodes stored separately
  };
});

export const mockEpisodesByPodcast: Record<string, Episode[]> = mockPodcasts.reduce((acc, podcast) => {
  acc[podcast.id] = generateEpisodes(podcast.id, randomInt(5, 10));
  return acc;
}, {} as Record<string, Episode[]>);
