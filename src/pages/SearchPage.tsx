import React, { useState, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { mockPodcasts } from '../data/mockPodcasts';
import { Podcast, Category } from '../types/index';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import PodcastList from '../components/PodcastList';

const allCategories: Category[] = Array.from(
  new Set(mockPodcasts.flatMap((p) => p.category))
).sort();

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- query & filters from URL (allow deep-linking)
  const initialQuery = searchParams.get('q') ?? '';
  const initialCats = searchParams.get('cats')?.split(',').filter(Boolean) ?? [];
  const initialRating = searchParams.get('rating') ? Number(searchParams.get('rating')!) : undefined;

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(initialCats as Category[]);
  const [rating, setRating] = useState<number | undefined>(initialRating);

  // Debounced query to avoid churn
  const debouncedQuery = useDebounce(query, 300);

  // Keep URL in sync (query and filters)
  React.useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedQuery) params.q = debouncedQuery.trim();
    if (selectedCategories.length) params.cats = selectedCategories.join(',');
    if (rating !== undefined) params.rating = String(rating);
    setSearchParams(params);
  }, [debouncedQuery, selectedCategories, rating, setSearchParams]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return mockPodcasts.filter((p) => {
      const match = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const catMatch = selectedCategories.length === 0 || selectedCategories.some((c) => p.category.includes(c));
      const ratingMatch = rating === undefined || p.rating >= rating;
      return match && catMatch && ratingMatch;
    });
  }, [debouncedQuery, selectedCategories, rating]);

  // Sort by rating desc (could add more sorts later)
  const sorted = useMemo(() => [...filtered].sort((a, b) => b.rating - a.rating), [filtered]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Search Podcasts</h1>
      <SearchBar value={query} onChange={setQuery} />
      <FilterPanel
        categories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        rating={rating}
        onFilterChange={({ rating: r }) => setRating(r)}
      />
      {sorted.length === 0 ? (
        <div className="text-gray-500">No results found.</div>
      ) : (
        <PodcastList podcasts={sorted} />
      )}
    </div>
  );
};

export default SearchPage;
