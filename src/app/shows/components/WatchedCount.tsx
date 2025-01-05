import { trpc } from '@/server/clients/server-api';

export default async function WatchedCount({ showId }: { showId: string }) {
  const shows = await trpc.watchedShows.getWatchedShowsByShow({ showId });
  return (
    <div className="text-sm">{shows?.length ?? 0} people have watched this show</div>
  );
}
