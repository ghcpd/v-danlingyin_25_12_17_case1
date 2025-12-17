import React from 'react';

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        aria-label="Search podcasts"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Search podcasts, episodes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;