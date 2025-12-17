import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { PodcastList } from '../components/PodcastList';
import { EmptyState } from '../components/EmptyState';
import { mockPodcasts, getAllCategories } from '../data/mockPodcasts';
import { Category, FilterOptions } from '../types';
import { useLibrary } from '../context/index';
import { Search } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    minRating: 0,
    sortBy: 'relevance',
  });

  const { subscribed, subscribe, unsubscribe } = useLibrary();

  const results = useMemo(() => {
    let filtered = mockPodcasts;

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.author.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((p) => p.category.includes(filters.category as Category));
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    const sorted = [...filtered];
    if (filters.sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'recent') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // Relevance sorting (basic implementation)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        sorted.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
          const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
          return bTitle - aTitle;
        });
      }
    }

    return sorted;
  }, [searchQuery, filters]);

  const handleSubscribeToggle = (podcastId: string, shouldSubscribe: boolean) => {
    if (shouldSubscribe) {
      subscribe(podcastId);
    } else {
      unsubscribe(podcastId);
    }
  };

  return (
    <div className="pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Podcasts</h1>
          <p className="text-gray-600 dark:text-gray-400">Find your favorite shows</p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, author, or topic..."
        />

        <div className="mt-8">
          <FilterPanel
            onFilterChange={setFilters}
            categories={getAllCategories()}
          />
        </div>

        {/* Results */}
        <div>
          {results.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Found {results.length} podcast{results.length !== 1 ? 's' : ''}
              </p>
              <PodcastList
                podcasts={results}
                onSubscribeToggle={handleSubscribeToggle}
                subscribedIds={subscribed}
              />
            </>
          ) : (
            <EmptyState
              title="No results found"
              description={
                searchQuery
                  ? `We couldn't find any podcasts matching "${searchQuery}". Try different keywords.`
                  : 'Use the search bar to find podcasts'
              }
              icon={<Search size={48} className="text-gray-400" />}
              action={
                searchQuery
                  ? { label: 'Clear Search', onClick: () => setSearchQuery('') }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
