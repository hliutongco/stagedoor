import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import WatchedCount from '../components/WatchedCount';
import RatingWatchedContainer from '../components/RatingWatchedContainer';
import Image from 'next/image';
import { Separator } from '@/components/ui';
import ReviewModal from './components/ReviewModal';

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
    <>
      <div className="my-10 sm:p-4 lg:p-8">
        <h2 className="font-bold sm:text-2xl lg:text-4xl text-center">
          {show.title} ({show.year})
        </h2>
        <WatchedCount showId={show?.id ?? ''} />
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4 items-center sm:mb-4">
            <Image alt={show.title} height={394} src={show.playbillImage} width={250} />
          </div>
          <RatingWatchedContainer
            hasRatingOrReview={Boolean(userShow?.hasRating || userShow?.hasReview)}
            id={userShow?.id}
            isWatched={Boolean(userShow?.isWatched)}
            rating={userShow?.rating}
            showId={show?.id ?? ''}
            userId={userId}
          />
        </div>
      </div>
      <div className="bg-primary min-h-[50svh] mt-10 sm:p-4 lg:p-8">
        <div className="flex justify-between mb-2">
          <h2 className="font-bold sm:text-lg lg:text-2xl">All Reviews</h2>
          <ReviewModal />
        </div>
        <Separator className="bg-muted" />
        <div className="flex flex-col my-2 pt-6">
          <div className="grid grid-cols-4">
            <div className="p-2 text-center">
              {/* <Image alt="user" src=""></Image> */}
              Helen L.
            </div>
            <div className="col-span-3 p-2">some review text</div>
          </div>
          <p className="text-center">Nothing for now!</p>
        </div>
      </div>
    </>
  );
}
