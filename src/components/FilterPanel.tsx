import React from 'react';
import type { Category } from '../types';
import CategoryPill from './CategoryPill';

const FilterPanel: React.FC<{ categories: Category[]; active?: string; onSelect?: (c: string) => void }> = ({ categories, active, onSelect }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((c) => (
        <CategoryPill key={c} label={c} active={active === c} onClick={() => onSelect?.(c)} />
      ))}
    </div>
  );
};

export default FilterPanel;