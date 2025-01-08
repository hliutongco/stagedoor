import { auth, currentUser } from '@clerk/nextjs/server';
import ShowsList from '../components/ShowsList';
import { trpc } from '@/server/clients/server-api';

export default async function MyProfilePage() {
  const user = await currentUser();
  if (!user) return (await auth()).redirectToSignIn();
  const _watchedShows = await trpc.userShows.getAllWatchedByUser({
    userId: user.id,
  });
  const watchedShows = _watchedShows.map((show) => show.showId ?? '');
  const shows = await trpc.shows.getShowsById({ ids: watchedShows });
  return (
    <>
      <h1>{user?.firstName ?? 'User'}&apos;s Profile</h1>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h2>Your Playbill Collection</h2>
        {shows && <ShowsList shows={shows} />}
      </div>
    </>
  );
}
