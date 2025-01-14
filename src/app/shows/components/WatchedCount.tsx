import { trpc } from '@/server/clients/server-api';

export default async function WatchedCount({ showId }: { showId: string }) {
  const shows = await trpc.userShows.getAllWatchedByShow({ showId });
  return (
    <div className="py-4 text-center text-sm">
      {shows?.length ?? 0} people have watched this show
    </div>
  );
}
