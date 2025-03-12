/* eslint-disable indent */
import { Metadata } from 'next';
import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import { ReactNode } from 'react';
import IsWatchedProvider from './components/isWatchedProvider';
import ReviewModal from './components/ReviewModal';
import StarRating from '../components/star-rating/dynamic';
import WatchedButton from '../components/WatchedButton';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import { transformCharacters } from '@/lib/utils/index';
import ReviewContainer from './components/ReviewContainer';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const show = await trpc.shows.getShow({ slug: decodeURIComponent(slug) });
  return {
    title: show?.title ?? 'Current Show',
  };
}

export default async function ShowView({ params }: Props) {
  const [{ slug }, user] = await Promise.all([params, currentUser()]);
  const username = user?.username ?? '';
  const show = await trpc.shows.getShow({ slug: decodeURIComponent(slug) });
  const userShow = await trpc.userShows.getUserShow({
    showId: show?.id ?? '',
    userIdentifier: username,
  });
  return (
    <IsWatchedProvider isWatched={Boolean(userShow?.isWatched)}>
      <div className="my-2 p-4 lg:p-8">
        <h2
          aria-label={`${show?.title ?? 'Current Show'} ${show?.year ?? 'Unknown Year'}`}
          className="font-bold text-3xl lg:text-5xl text-center"
        >
          {show?.title ?? ''} ({show?.year ?? ''})
        </h2>
        <div className="py-4 text-center">
          <p>{show?.userShows.length ?? 0} people have watched this show</p>
          {show?.averageRating !== '0' && (
            <p className="pt-2 text-center">Average Rating: {show?.averageRating} / 5</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4 items-center mb-4">
            <CloudinaryImage
              alt={show?.title ?? ''}
              height={394}
              priority
              src={transformCharacters(show?.slug ?? '')}
              style={{ height: '394px', width: '250px' }}
              width={250}
            />
          </div>
          <div className="flex flex-col gap-8 items-center">
            <WatchedButton
              hasRatingOrReview={Boolean(userShow?.hasRating || userShow?.reviews.length)}
              id={userShow?.id}
              showId={show?.id ?? ''}
              userIdentifier={username}
            />
            <div className="flex flex-col gap-2 items-center">
              <p>Your Rating:</p>
              <StarRating
                hasRatingOrReview={Boolean(
                  userShow?.hasRating || userShow?.reviews.length,
                )}
                id={userShow?.id}
                rating={userShow?.rating}
                showId={show?.id ?? ''}
                sumRatings={show?.sumRatings ?? 0}
                totalRatings={show?.totalRatings ?? 0}
                userIdentifier={username}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-light min-h-[50svh] mt-10 p-4 lg:p-8">
        <div className="flex justify-between mb-2">
          <h2 className="font-bold text-lg lg:text-2xl">All Reviews</h2>
          <ReviewModal
            showId={show?.id ?? ''}
            userIdentifier={username ?? ''}
            userShowId={userShow?.id}
          />
        </div>
        <div className="flex flex-col mt-2">
          {show?.reviews.map<ReactNode>((review) => {
            return (
              <ReviewContainer
                key={review.id}
                review={review}
                username={user?.username}
              />
            );
          })}
          {!show?.reviews?.length && <p className="text-center">Nothing for now!</p>}
        </div>
      </div>
    </IsWatchedProvider>
  );
}
