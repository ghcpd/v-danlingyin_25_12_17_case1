import React from 'react';
import { useParams } from 'react-router-dom';
import { podcasts } from '../data/mockPodcasts';
import PodcastList from '../components/PodcastList';
import EmptyState from '../components/EmptyState';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const list = podcasts.filter((p) => p.category.includes(name as any));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Category: {name}</h1>
      {list.length ? <PodcastList podcasts={list} /> : <EmptyState title="No podcasts" subtitle={`No podcasts found for ${name}`} />}
    </div>
  );
};

export default CategoryPage;