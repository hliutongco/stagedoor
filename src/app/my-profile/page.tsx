import { auth, currentUser } from '@clerk/nextjs/server';
import PlaybillCollection from './components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';

export default async function MyProfilePage() {
  const user = await currentUser();
  if (!user) return (await auth()).redirectToSignIn();
  const watchedUserShows = await trpc.userShows.getAllWatchedByUser({
    userId: user.id,
  });
  const watchedShowIds = watchedUserShows.map((show) => show.showId ?? '');
  const _watchedShows = await trpc.shows.getShowsById({ ids: watchedShowIds });
  const watchedShows = _watchedShows.map((show) => {
    const foundUserShow = watchedUserShows.find(
      (userShow) => userShow.showId === show.id,
    );
    return {
      id: show.id,
      playbillImage: show.playbillImage,
      rating: foundUserShow?.rating ?? '0',
      slug: show.slug,
      title: show.title,
    };
  });
  return (
    <>
      <h1 className="font-bold sm:text-3xl lg:text-5xl mt-10 text-center">Your Profile</h1>
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
    </>
  );
}
