import React from 'react';

const EmptyState: React.FC<{ title?: string; subtitle?: string }> = ({ title = 'Nothing here', subtitle = 'Try subscribing or searching for podcasts' }) => {
  return (
    <div className="text-center py-16">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;