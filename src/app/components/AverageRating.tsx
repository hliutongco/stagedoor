import { trpc } from '@/server/clients/server-api';

export default async function AverageRating(showId: { showId: string }) {
  const [averageRating] = await trpc.userShows.getAverageRating(showId);
  return (
    <div className="text-sm">
      Average Rating:
      {averageRating.value} / 5
    </div>
  );
}
