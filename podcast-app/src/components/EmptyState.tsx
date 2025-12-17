import React from 'react';
import { EmptyStateProps } from '../types';
import { AlertCircle } from 'lucide-react';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-4 text-gray-400">
        {icon || <AlertCircle size={48} />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
