import React from 'react';

export type LibraryTab = 'subscriptions' | 'favorites' | 'history';

interface Props {
  current: LibraryTab;
  onChange: (tab: LibraryTab) => void;
}

const LibraryTabs: React.FC<Props> = ({ current, onChange }) => (
  <div role="tablist" aria-label="Library tabs" className="flex space-x-2 mb-4">
    {(['subscriptions', 'favorites', 'history'] as LibraryTab[]).map((t) => (
      <button
        key={t}
        role="tab"
        aria-selected={current === t}
        onClick={() => onChange(t)}
        className={`px-4 py-2 rounded-t ${current === t ? 'bg-white text-primary border-b-0' : 'bg-gray-200 text-gray-800'} border`}
      >
        {t.charAt(0).toUpperCase() + t.slice(1)}
      </button>
    ))}
  </div>
);

export default LibraryTabs;
