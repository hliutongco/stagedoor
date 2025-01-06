import { trpc } from '@/server/clients/server-api';
import WatchedButton from '../components/WatchedButton';
import { currentUser } from '@clerk/nextjs/server';
import WatchedCount from '../components/WatchedCount';
import StarRating from '@/components/../core/star-rating';

export default async function ShowView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  const userId = user?.id ?? '';
  const [show] = await trpc.shows.getShow({ id });
  const watchedShow = await trpc.watchedShows.getWatchedShow({
    showId: id,
    userId,
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>{show.title}</h2>
      <p>Your Rating:</p>
      <StarRating showId={id} userId={userId} />
      <WatchedCount showId={id} />
      <WatchedButton id={id} isWatched={Boolean(watchedShow)} userId={user?.id} />
    </div>
  );
}
