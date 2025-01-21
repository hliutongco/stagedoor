import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui';
import IsWatchedProvider from './components/isWatchedProvider';
import ReviewModal from './components/ReviewModal';
import StarRating from '../components/star-rating/dynamic';
import WatchedButton from '../components/WatchedButton';
import ReviewCard from './components/ReviewCard';

export default async function ShowView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await currentUser();
  const userId = user?.id ?? '';
  const show = await trpc.shows.getShow({ slug: decodeURIComponent(slug) });
  const userShow = await trpc.userShows.getUserShow({ showId: show?.id ?? '', userId });
  return (
    <IsWatchedProvider isWatched={Boolean(userShow?.isWatched)}>
      <div className="my-10 sm:p-4 lg:p-8">
        <h2 className="font-bold sm:text-2xl lg:text-4xl text-center">
          {show?.title ?? ''} ({show?.year ?? ''})
        </h2>
        <div className="py-4 text-center text-sm">
          {show?.userShows.length ?? 0} people have watched this show
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4 items-center sm:mb-4">
            <Image
              alt={show?.title ?? ''}
              height={394}
              src={show?.playbillImage ?? ''}
              width={250}
            />
          </div>
          <div className="flex flex-col gap-8 items-center">
            <WatchedButton
              hasRatingOrReview={Boolean(userShow?.hasRating || userShow?.reviews.length)}
              id={userShow?.id}
              showId={show?.id ?? ''}
              userId={userId}
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
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary min-h-[50svh] mt-10 sm:p-4 lg:p-8">
        <div className="flex justify-between mb-2">
          <h2 className="font-bold sm:text-lg lg:text-2xl">All Reviews</h2>
          <ReviewModal
            showId={show?.id ?? ''}
            userId={userId ?? ''}
            userShowId={userShow?.id}
          />
        </div>
        <Separator className="bg-muted" />
        <div className="flex flex-col my-2 pt-6">
          {show?.reviews.map<ReactNode>((review) => {
            return (
              <div className="grid grid-cols-4 lg:grid-cols-5" key={review.id}>
                <div className="flex flex-col items-center p-2 text-center">
                  <Image
                    alt={review.user?.username + 'profile picture'}
                    className="rounded-sm"
                    height={75}
                    src={review.user?.imageUrl ?? ''}
                    width={75}
                  />
                  {review.user?.username ? (
                    <span>{review.user?.username}</span>
                  ) : (
                    <span>
                      {review.user?.firstName} {review.user?.lastName}
                    </span>
                  )}
                </div>
                <div className="col-span-3 lg:col-span-4 p-2">
                  <div className="flex font-bold gap-2 justify-between pb-0 text-sm">
                    <span>{review.title}</span>
                    {user && <ReviewCard review={review} />}
                  </div>
                  <p>{review.body}</p>
                </div>
              </div>
            );
          })}
          {!show?.reviews?.length && <p className="text-center">Nothing for now!</p>}
        </div>
      </div>
    </IsWatchedProvider>
  );
}
