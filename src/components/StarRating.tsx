import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  rating: number; // 0-5
}

export const StarRating: React.FC<Props> = ({ rating }) => {
  // Ensure rating between 0 and 5
  const rounded = Math.round(rating * 2) / 2; // allow half stars
  const fullStars = Math.floor(rounded);
  const half = rounded - fullStars >= 0.5;

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return 'full';
    if (i === fullStars && half) return 'half';
    return 'empty';
  });

  return (
    <div className="flex items-center" aria-label={`Rating: ${rounded} out of 5 stars`}>
      {stars.map((type, idx) => (
        <StarIcon
          key={idx}
          className={`h-4 w-4 ${
            type === 'full' ? 'text-yellow-400' : type === 'half' ? 'text-yellow-300' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
