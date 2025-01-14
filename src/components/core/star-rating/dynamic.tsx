'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { toast } from '@/components/ui/hooks/use-toast';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import '../styles/star-rating.scss';

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  hasRatingOrReview: boolean;
  id: string | undefined;
  isWatched: boolean;
  rating: string | undefined;
  setIsWatched: (isWatched: boolean) => void;
  showId: string;
  slug: string;
  userId: string;
}

const StarRating = ({
  hasRatingOrReview,
  id,
  isWatched,
  rating,
  setIsWatched,
  showId,
  slug,
  userId,
}: RatingsProps) => {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const [value, setValue] = useState(rating ?? '0');
  const createRatingMutation = trpc.userShows.createWithRating.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: () =>
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Rating successfully saved!',
      }),
  });
  const updateRatingMutation = trpc.userShows.changeRating.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: () =>
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Rating successfully saved!',
      }),
  });
  const onValueChange = useCallback(
    (e: ChangeEvent) => {
      if (!userId) {
        redirectToSignIn();
        return;
      }
      const newValue = (e.target as HTMLInputElement).value;
      setValue(newValue);
      if (!isWatched && !hasRatingOrReview) {
        createRatingMutation.mutate({ rating: newValue, showId, userId });
      } else if (id) {
        updateRatingMutation.mutate({ id, rating: newValue });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Please refresh the page and try again',
        });
        return;
      }
      setIsWatched(true);
      router.refresh();
      router.push(`/shows/${slug}`);
    },
    [
      createRatingMutation,
      hasRatingOrReview,
      id,
      isWatched,
      redirectToSignIn,
      router,
      setIsWatched,
      showId,
      slug,
      updateRatingMutation,
      userId,
    ],
  );

  return (
    <fieldset className="rating">
      <input
        checked={value === '5'}
        id="star5"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="5"
      />
      <label className="full" htmlFor="star5" title="Masterpiece - 5 stars"></label>
      <input
        checked={value === '4.5'}
        id="star4half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="4.5"
      />
      <label className="half" htmlFor="star4half" title="Very good - 4.5 stars"></label>
      <input
        checked={value === '4'}
        id="star4"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="4"
      />
      <label className="full" htmlFor="star4" title="Very good - 4 stars"></label>
      <input
        checked={value === '3.5'}
        id="star3half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="3.5"
      />
      <label
        className="half"
        htmlFor="star3half"
        title="Above Average - 3.5 stars"
      ></label>
      <input
        checked={value === '3'}
        id="star3"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="3"
      />
      <label className="full" htmlFor="star3" title="Above Average - 3 stars"></label>
      <input
        checked={value === '2.5'}
        id="star2half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="2.5"
      />
      <label className="half" htmlFor="star2half" title="Average - 2.5 stars"></label>
      <input
        checked={value === '2'}
        id="star2"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="2"
      />
      <label className="full" htmlFor="star2" title="Below Average - 2 stars"></label>
      <input
        checked={value === '1.5'}
        id="star1half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="1.5"
      />
      <label className="half" htmlFor="star1half" title="Bad - 1.5 stars"></label>
      <input
        checked={value === '1'}
        id="star1"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="1"
      />
      <label className="full" htmlFor="star1" title="Bad - 1 star"></label>
      <input
        checked={value === '0.5'}
        id="starhalf"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value="0.5"
      />
      <label className="half" htmlFor="starhalf" title="Very Bad - 0.5 stars"></label>
    </fieldset>
  );
};

export default StarRating;
