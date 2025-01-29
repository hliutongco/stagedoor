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
      id: userShow.id,
      hasRatingOrReview: userShow.hasRating || user.reviews.length > 0,
      playbillImage: show?.playbillImage ?? '',
      rating: `${userShow.rating}`,
      showId: show?.id ?? '',
      slug: show?.slug ?? '',
      title: show?.title ?? '',
      userId: user?.id ?? '',
    };
  });
  return (
    <>
      <h1 className="font-bold mt-10 text-xl lg:text-3xl text-center">Your Profile</h1>
      <p className="text-center">
        <Link
          className="hover:underline text-primary-dark"
          href={`/users/${user?.username}`}
        >
          View Your Public Profile
        </Link>
      </p>
      <Description description={user?.description ?? ''} userId={user?.id} />
      {watchedShows && <PlaybillCollection isPrivate shows={watchedShows} />}
      <ReviewCollection isPrivate reviews={user?.reviews ?? []} />
    </>
  );
}
