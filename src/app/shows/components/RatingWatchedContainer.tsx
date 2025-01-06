'use client';

import WatchedButton from '../components/WatchedButton';
import StarRating from '@/components/../core/star-rating';
import { useState } from 'react';

interface RatingWatchedContainerProps {
  rating: string | undefined;
  showId: string;
  userId: string;
  isWatched: boolean;
}

export default function RatingWatchedContainer({
  rating,
  showId,
  userId,
  isWatched: _isWatched,
}: RatingWatchedContainerProps) {
  const [isWatched, setIsWatched] = useState(_isWatched);
  return (
    <>
      <p>Your Rating:</p>
      <StarRating
        isWatched={isWatched}
        rating={rating}
        setIsWatched={setIsWatched}
        showId={showId}
        userId={userId}
      />
      <WatchedButton
        id={showId}
        isWatched={isWatched}
        setIsWatched={setIsWatched}
        userId={userId}
      />
    </>
  );
}
