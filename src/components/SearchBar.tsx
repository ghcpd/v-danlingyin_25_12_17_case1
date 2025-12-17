import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  value?: string; // optional initial value
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value = '', onChange }) => {
  const [internal, setInternal] = useState(value);
  const debounced = useDebounce<string>(internal, 300);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search podcasts..."
        aria-label="Search podcasts"
        value={internal}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
