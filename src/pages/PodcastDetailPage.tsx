import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { podcasts, episodes } from '../data/mockPodcasts';
import EpisodeItem from '../components/EpisodeItem';
import SubscribeButton from '../components/SubscribeButton';
import type { Podcast } from '../types';

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = useMemo(() => podcasts.find((p) => p.id === id) as Podcast | undefined, [id]);

  if (!podcast) return <div className="container mx-auto p-8">Podcast not found</div>;

  const ps = episodes.filter((e) => e.podcastId === podcast.id).sort((a, b) => b.episodeNumber - a.episodeNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6 items-center">
        <img src={podcast.coverImage} alt="cover" className="w-40 h-40 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{podcast.title}</h1>
          <p className="text-sm text-gray-600">By {podcast.author}</p>
          <div className="mt-2 flex gap-2 items-center">
            <span className="text-sm text-gray-500">{podcast.episodeCount} episodes</span>
            <span className="text-sm text-gray-500">{podcast.subscribers} subscribers</span>
            <span className="text-sm bg-gray-100 px-2 rounded">⭐ {podcast.rating}</span>
          </div>
          <div className="mt-4">
            <SubscribeButton podcastId={podcast.id} />
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 text-sm text-gray-700">{podcast.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Episodes</h2>
        <div className="mt-3 bg-white rounded shadow-sm">
          {ps.map((ep) => (
            <EpisodeItem key={ep.id} episode={ep} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PodcastDetailPage;
