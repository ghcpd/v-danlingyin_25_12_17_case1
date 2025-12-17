import React from 'react';

interface Props {
  title: string;
  description?: string;
}

const EmptyState: React.FC<Props> = ({ title, description }) => (
  <div className="text-center py-16 px-4" role="status">
    <div className="text-3xl font-semibold mb-2">{title}</div>
    {description && <p className="text-gray-600">{description}</p>}
  </div>
);

export default EmptyState;
