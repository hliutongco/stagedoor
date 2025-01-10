import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import WatchedCount from '../components/WatchedCount';
import RatingWatchedContainer from '../components/RatingWatchedContainer';

export default async function ShowView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await currentUser();
  const userId = user?.id ?? '';
  const [show] = await trpc.shows.getShow({ slug });
  const userShow = await trpc.userShows.getUserShow({ showId: show?.id ?? '', userId });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>{show.title}</h2>
      <WatchedCount showId={show?.id ?? ''} />
      <RatingWatchedContainer
        hasRatingOrReview={Boolean(userShow?.hasRating || userShow?.hasReview)}
        id={userShow?.id}
        isWatched={Boolean(userShow?.isWatched)}
        rating={userShow?.rating}
        showId={show?.id ?? ''}
        userId={userId}
      />
    </div>
  );
}
