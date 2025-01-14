'use client';

import WatchedButton from '../components/WatchedButton';
import StarRating from '@/components/core/star-rating/dynamic';
import { useState } from 'react';

interface RatingWatchedContainerProps {
  hasRatingOrReview: boolean;
  id: string | undefined;
  isWatched: boolean;
  rating: string | undefined;
  showId: string;
  userId: string;
}

export default function RatingWatchedContainer({
  hasRatingOrReview,
  id,
  isWatched: _isWatched,
  rating,
  showId,
  userId,
}: RatingWatchedContainerProps) {
  const [isWatched, setIsWatched] = useState(_isWatched);
  return (
    <div className="flex flex-col gap-4 items-center">
      <WatchedButton
        hasRatingOrReview={hasRatingOrReview}
        id={id}
        isWatched={isWatched}
        setIsWatched={setIsWatched}
        showId={showId}
        userId={userId}
      />
      <p>Your Rating:</p>
      <StarRating
        hasRatingOrReview={hasRatingOrReview}
        id={id}
        isWatched={isWatched}
        rating={rating}
        setIsWatched={setIsWatched}
        showId={showId}
        userId={userId}
      />
    </div>
  );
}
