import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { PodcastList } from '../components/PodcastList';
import { EmptyState } from '../components/EmptyState';
import { mockPodcasts } from '../data/mockPodcasts';
import { FilterOptions, SortOption } from '../types';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const filteredPodcasts = useMemo(() => {
    let filtered = mockPodcasts.filter((podcast) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = podcast.title.toLowerCase().includes(query);
        const matchesAuthor = podcast.author.toLowerCase().includes(query);
        const matchesDescription = podcast.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesDescription) {
          return false;
        }
      }

      // Category filter
      if (filters.category && !podcast.category.includes(filters.category)) {
        return false;
      }

      // Rating filter
      if (filters.rating && podcast.rating < filters.rating) {
        return false;
      }

      // Duration filter (simplified - using episode count as proxy)
      if (filters.duration) {
        const avgDuration = 1800; // 30 min average
        if (filters.duration === 'short' && avgDuration >= 1800) return false;
        if (filters.duration === 'medium' && (avgDuration < 1800 || avgDuration > 3600)) return false;
        if (filters.duration === 'long' && avgDuration <= 3600) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b.id.localeCompare(a.id); // Simplified
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Podcasts</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
              />

              {/* Sort Options */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Sort by</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="recent">Recent</option>
                </select>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by title, author, or description..."
                className="mb-6"
              />

              {filteredPodcasts.length > 0 ? (
                <PodcastList podcasts={filteredPodcasts} />
              ) : (
                <EmptyState
                  title="No podcasts found"
                  description="Try adjusting your search query or filters to find what you're looking for."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}