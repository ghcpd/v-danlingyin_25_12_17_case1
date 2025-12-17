import React, { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import PodcastList from '../components/PodcastList';
import { podcasts } from '../data/mockPodcasts';
import useDebounce from '../hooks/useDebounce';
import { Category } from '../types';

const SearchPage: React.FC = () => {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const debounced = useDebounce(q, 300);

  const results = useMemo(() => {
    const lower = debounced.trim().toLowerCase();
    return podcasts.filter((p) => {
      const matchesQ = !lower || p.title.toLowerCase().includes(lower) || p.author.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower);
      const matchesCat = !category || p.category.includes(category as Category);
      return matchesQ && matchesCat;
    });
  }, [debounced, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Search</h1>
      <div className="mb-4">
        <SearchBar value={q} onChange={setQ} />
      </div>
      <div className="mb-4">
        <FilterPanel categories={Object.values(Category)} active={category} onSelect={(c) => setCategory((prev) => (prev === c ? undefined : c))} />
      </div>
      <div>
        {results.length === 0 ? <div className="text-sm text-gray-500">No results</div> : <PodcastList podcasts={results} />}
      </div>
    </div>
  );
};

export default SearchPage;