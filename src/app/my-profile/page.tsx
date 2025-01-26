import { currentUser } from '@clerk/nextjs/server';
import PlaybillCollection from './components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import ReviewCollection from './components/ReviewCollection';
import Link from 'next/link';
import Description from './components/Description';

export default async function MyProfilePage() {
  const _user = await currentUser();
  const user = await trpc.users.getUser({
    username: _user?.username ?? '',
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
      <p className="mt-10 text-center">
        <Link
          className="hover:underline text-primary text-sm"
          href={`/users/${user?.username}`}
        >
          View Your Public Profile
        </Link>
      </p>
      <h1 className="font-bold sm:text-xl lg:text-3xl text-center">Your Profile</h1>
      <Description description={user?.description ?? ''} />
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
      <ReviewCollection reviews={user?.reviews ?? []} />
    </>
  );
}
