'use client';

import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { toast } from '@/components/ui/hooks/use-toast';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import '@/components/core/styles/star-rating.scss';
import RemoveRating from './remove-rating';
import { IsWatchedContext } from '../../[slug]/components/isWatchedProvider';

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  hasRatingOrReview: boolean;
  id: string | undefined;
  name?: string;
  rating: string | undefined;
  showId: string;
  sumRatings: string | number;
  totalRatings: number;
  userIdentifier: string;
}

const StarRating = ({
  hasRatingOrReview,
  id,
  name = 'show',
  rating,
  sumRatings,
  totalRatings,
  showId,
  userIdentifier,
}: RatingsProps) => {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { isWatched, setIsWatched } = useContext(IsWatchedContext);
  const [value, setValue] = useState(rating ?? '0');
  const utils = trpc.useUtils();
  const createRatingMutation = trpc.userShows.createWithRating.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.userShows.invalidate();
      router.refresh();
      toast({
        description: 'Rating successfully saved!',
        title: 'Success!',
        variant: 'default',
      });
    },
  });
  const updateRatingMutation = trpc.userShows.changeRating.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.userShows.invalidate();
      router.refresh();
      toast({
        description: 'Rating successfully saved!',
        title: 'Success!',
        variant: 'default',
      });
    },
  });
  const editShowMutation = trpc.shows.editShow.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.shows.invalidate();
      router.refresh();
    },
  });
  const onValueChange = useCallback(
    (e: ChangeEvent) => {
      if (!userIdentifier) {
        redirectToSignIn();
        return;
      }
      const newValue = (e.target as HTMLInputElement).value;
      setValue(newValue);
      if (!isWatched && !hasRatingOrReview) {
        createRatingMutation.mutate({ rating: newValue, showId, userIdentifier });
        editShowMutation.mutate({
          id: showId,
          sumRatings: `${Number(sumRatings) + Number(newValue)}`,
          totalRatings: totalRatings + 1,
        });
      } else if (id) {
        const newTotal =
          rating === '0' || rating === undefined ? totalRatings + 1 : totalRatings;
        updateRatingMutation.mutate({ id, rating: newValue });
        editShowMutation.mutate({
          id: showId,
          sumRatings: `${Number(sumRatings) + (Number(newValue) - Number(value))}`,
          totalRatings: newTotal,
        });
      } else {
        toast({
          description: 'Please refresh the page and try again',
          title: 'Uh oh! Something went wrong.',
          variant: 'destructive',
        });
        return;
      }
      setIsWatched(true);
    },
    [
      createRatingMutation,
      editShowMutation,
      hasRatingOrReview,
      id,
      isWatched,
      rating,
      redirectToSignIn,
      setIsWatched,
      showId,
      sumRatings,
      totalRatings,
      updateRatingMutation,
      userIdentifier,
      value,
    ],
  );

  return (
    <div
      aria-label={`Current rating: ${value} stars`}
      className="flex flex-col items-center justify-center"
    >
      <fieldset
        aria-label="Click to change your rating"
        className="dynamic rating"
        id={name}
        name={name}
      >
        <input
          checked={value === '5'}
          id={`${name}-star5`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="5"
        />
        <label className="full" htmlFor={`${name}-star5`} title="Masterpiece - 5 stars">
          <span hidden>Masterpiece - 5 stars</span>
        </label>
        <input
          checked={value === '4.5'}
          id={`${name}-star4half`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="4.5"
        />
        <label
          className="half"
          htmlFor={`${name}-star4half`}
          title="Excellent - 4.5 stars"
        >
          <span hidden>Excellent - 4.5 stars</span>
        </label>
        <input
          checked={value === '4'}
          id={`${name}-star4`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="4"
        />
        <label className="full" htmlFor={`${name}-star4`} title="Very good - 4 stars">
          <span hidden>Very good - 4 stars</span>
        </label>
        <input
          checked={value === '3.5'}
          id={`${name}-star3half`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="3.5"
        />
        <label className="half" htmlFor={`${name}-star3half`} title="Good - 3.5 stars">
          <span hidden>Good - 3.5 stars</span>
        </label>
        <input
          checked={value === '3'}
          id={`${name}-star3`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="3"
        />
        <label className="full" htmlFor={`${name}-star3`} title="Above Average - 3 stars">
          <span hidden>Above Average - 3 stars</span>
        </label>
        <input
          checked={value === '2.5'}
          id={`${name}-star2half`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="2.5"
        />
        <label className="half" htmlFor={`${name}-star2half`} title="Average - 2.5 stars">
          <span hidden>Average - 2.5 stars</span>
        </label>
        <input
          checked={value === '2'}
          id={`${name}-star2`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="2"
        />
        <label className="full" htmlFor={`${name}-star2`} title="Below Average - 2 stars">
          <span hidden>Below Average - 2 stars</span>
        </label>
        <input
          checked={value === '1.5'}
          id={`${name}-star1half`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="1.5"
        />
        <label className="half" htmlFor={`${name}-star1half`} title="Bad - 1.5 stars">
          <span hidden>Bad - 1.5 stars</span>
        </label>
        <input
          checked={value === '1'}
          id={`${name}-star1`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="1"
        />
        <label className="full" htmlFor={`${name}-star1`} title="Very Bad - 1 star">
          <span hidden>Very Bad - 1 star</span>
        </label>
        <input
          checked={value === '0.5'}
          id={`${name}-starhalf`}
          name={`${name}-rating`}
          onChange={onValueChange}
          type="radio"
          value="0.5"
        />
        <label className="half" htmlFor={`${name}-starhalf`} title="Disaster - 0.5 stars">
          <span hidden>Disaster - 0.5 stars</span>
        </label>
      </fieldset>
      {rating && rating !== '0' && (
        <RemoveRating
          id={id}
          rating={rating}
          setRating={setValue}
          showId={showId}
          sumRatings={sumRatings}
          totalRatings={totalRatings}
        />
      )}
    </div>
  );
};

export default StarRating;
