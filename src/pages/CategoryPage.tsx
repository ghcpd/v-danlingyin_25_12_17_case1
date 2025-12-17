import React from 'react';
import { useParams } from 'react-router-dom';
import { mockPodcasts } from '../data/mockPodcasts';
import PodcastList from '../components/PodcastList';
import { Category } from '../types/index';
import { useLibrary } from '../context/LibraryContext';
import EmptyState from '../components/EmptyState';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const cat = categoryName as Category | undefined;

  const podcasts = cat
    ? mockPodcasts.filter((p) => p.category.includes(cat))
    : [];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">{cat ?? 'Category'}</h1>
      {podcasts.length === 0 ? (
        <EmptyState title="No podcasts found" description={`No podcasts found in the ${cat} category.`} />
      ) : (
        <PodcastList podcasts={podcasts} />
      )}
    </div>
  );
};

export default CategoryPage;
