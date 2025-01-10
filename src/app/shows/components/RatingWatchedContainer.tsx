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
  slug: string;
  userId: string;
}

export default function RatingWatchedContainer({
  hasRatingOrReview,
  id,
  isWatched: _isWatched,
  rating,
  showId,
  slug,
  userId,
}: RatingWatchedContainerProps) {
  const [isWatched, setIsWatched] = useState(_isWatched);
  return (
    <>
      <WatchedButton
        hasRatingOrReview={hasRatingOrReview}
        id={id}
        isWatched={isWatched}
        setIsWatched={setIsWatched}
        showId={showId}
        slug={slug}
        userId={userId}
      />
      <p>Your Rating:</p>
      <StarRating
        id={id}
        rating={rating}
        setIsWatched={setIsWatched}
        showId={showId}
        slug={slug}
        userId={userId}
      />
    </>
  );
}
