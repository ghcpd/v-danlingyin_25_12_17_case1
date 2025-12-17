import React from 'react';
import { Category, CategoryPillProps } from '../types';

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
        isSelected
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300'
      }`}
      aria-pressed={isSelected}
      role="button"
    >
      {category}
    </button>
  );
};

interface CategoryGridProps {
  categories: Category[];
  selected?: Category | null;
  onSelect?: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <CategoryPill
          key={category}
          category={category}
          isSelected={selected === category}
          onClick={() => onSelect?.(category)}
        />
      ))}
    </div>
  );
};
