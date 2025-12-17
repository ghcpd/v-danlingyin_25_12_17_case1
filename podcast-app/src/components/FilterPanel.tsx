import React from 'react';
import { Category, FilterOptions } from '../types';
import { CategoryPill } from './CategoryPill';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterPanel({ filters, onFiltersChange, className = '' }: FilterPanelProps) {
  const categories = Object.values(Category);

  const handleCategoryChange = (category: Category | undefined) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleDurationChange = (duration: 'short' | 'medium' | 'long' | undefined) => {
    onFiltersChange({
      ...filters,
      duration: filters.duration === duration ? undefined : duration,
    });
  };

  const handleRatingChange = (rating: number | undefined) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryPill
              key={category}
              category={category}
              isActive={filters.category === category}
            />
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Short (< 30 min)', value: 'short' as const },
            { label: 'Medium (30-60 min)', value: 'medium' as const },
            { label: 'Long (> 60 min)', value: 'long' as const },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleDurationChange(value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.duration === value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.rating === rating
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {rating}+ ⭐
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.duration || filters.rating) && (
        <button
          onClick={() => onFiltersChange({})}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}