import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryPillProps {
  category: Category;
  isActive?: boolean;
}

export function CategoryPill({ category, isActive = false }: CategoryPillProps) {
  return (
    <Link
      to={`/category/${encodeURIComponent(category)}`}
      className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
      }`}
    >
      {category}
    </Link>
  );
}