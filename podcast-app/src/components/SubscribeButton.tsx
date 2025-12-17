import React from 'react';
import { UserPlus, UserCheck } from 'lucide-react';

interface SubscribeButtonProps {
  isSubscribed: boolean;
  onClick: () => void;
  className?: string;
}

export function SubscribeButton({ isSubscribed, onClick, className = '' }: SubscribeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isSubscribed
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          : 'bg-primary-500 text-white hover:bg-primary-600'
      } ${className}`}
      aria-label={isSubscribed ? 'Unsubscribe from podcast' : 'Subscribe to podcast'}
    >
      {isSubscribed ? (
        <>
          <UserCheck className="w-4 h-4" />
          <span>Subscribed</span>
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          <span>Subscribe</span>
        </>
      )}
    </button>
  );
}