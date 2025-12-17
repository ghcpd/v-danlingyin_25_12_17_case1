import React from 'react';
import { Category } from '../types/index';

interface Props {
  categories: Category[];
  selectedCategories: Category[];
  onCategoryChange: (cats: Category[]) => void;
  minDuration?: number;
  maxDuration?: number;
  rating?: number;
  onFilterChange?: (filters: { rating?: number }) => void;
}

const FilterPanel: React.FC<Props> = ({ categories, selectedCategories, onCategoryChange, rating, onFilterChange }) => {
  const toggleCategory = (cat: Category) => {
    if (selectedCategories.includes(cat)) {
      onCategoryChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoryChange([...selectedCategories, cat]);
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? parseFloat(e.target.value) : undefined;
    onFilterChange && onFilterChange({ rating: val });
  };

  return (
    <div className="border rounded p-4 mb-4" aria-label="Filter panel">
      <div className="mb-2">
        <label className="block font-semibold mb-1">Categories</label>
        <div className="flex flex-wrap">
          {categories.map((cat) => (
            <label key={cat} className="mr-4">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="mr-1"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Rating</label>
        <select value={rating ?? ''} onChange={handleRatingChange} className="border rounded p-1">
          <option value="">Any</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} stars & up
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
