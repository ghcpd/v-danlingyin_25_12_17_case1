import { Podcast, Episode, Category } from '../types';

const sampleAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const podcasts: Podcast[] = [];
const episodes: Episode[] = [];

const categoryList = [
  Category.Technology,
  Category.Business,
  Category.Comedy,
  Category.Education,
  Category.Health,
  Category.TrueCrime,
  Category.News,
  Category.Sports,
  Category.Science,
  Category.History
];

for (let i = 1; i <= 12; i++) {
  const id = `pod-${i}`;
  const cat = [categoryList[i % categoryList.length]];
  const epCount = rand(5, 10);
  podcasts.push({
    id,
    title: `Podcast ${i} — ${cat[0]}`,
    author: `Author ${i}`,
    description: `This is a sample description for Podcast ${i}. It covers topics in ${cat[0]}.`,
    coverImage: `https://picsum.photos/seed/pod${i}/400/400`,
    category: cat,
    episodeCount: epCount,
    subscribers: rand(500, 50000),
    rating: Number((rand(30, 50) / 10).toFixed(1))
  });

  for (let j = 1; j <= epCount; j++) {
    episodes.push({
      id: `ep-${i}-${j}`,
      podcastId: id,
      title: `Episode ${j}: Topic ${j}`,
      description: `Episode ${j} from Podcast ${i}. An in-depth discussion about Topic ${j}.`,
      duration: rand(5 * 60, 60 * 60),
      releaseDate: new Date(Date.now() - rand(0, 1000) * 24 * 3600 * 1000).toISOString(),
      audioUrl: sampleAudio,
      episodeNumber: j,
      thumbnail: `https://picsum.photos/seed/ep${i}${j}/200/200`
    });
  }
}

export { podcasts, episodes };
