import React from 'react';

const CategoryPill: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-1`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
};

export default CategoryPill;
