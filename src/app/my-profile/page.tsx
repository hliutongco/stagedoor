import { currentUser } from '@clerk/nextjs/server';
import PlaybillCollection from './components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';

export default async function MyProfilePage() {
  const _user = await currentUser();
  const user = await trpc.users.getUser({
    id: _user?.id ?? '',
  });
  const watchedShows = user?.userShows.map((userShow) => {
    const show = userShow.show;
    return {
      id: show?.id ?? '',
      playbillImage: show?.playbillImage ?? '',
      rating: `${userShow.rating}`,
      slug: show?.slug ?? '',
      title: show?.title ?? '',
    };
  });
  return (
    <>
      <h1 className="font-bold sm:text-3xl lg:text-5xl mt-10 text-center">
        Your Profile
      </h1>
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
    </>
  );
}
