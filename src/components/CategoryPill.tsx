import React from 'react';

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryPill: React.FC<Props> = ({ label, active = false, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
      active ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800'
    }`}
  >
    {label}
  </button>
);

export default CategoryPill;
