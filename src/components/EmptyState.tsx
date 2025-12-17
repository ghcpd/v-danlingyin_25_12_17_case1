import React from 'react'

export const EmptyState: React.FC<{ title?: string; description?: string }> = ({ title = 'No items', description }) => (
  <div className="p-8 text-center text-gray-500">
    <div className="text-xl font-semibold">{title}</div>
    {description && <div className="mt-2">{description}</div>}
  </div>
)

export default EmptyState
