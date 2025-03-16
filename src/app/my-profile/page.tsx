import { currentUser } from '@clerk/nextjs/server';
import PlaybillCollection from './components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import ReviewCollection from '../components/ReviewCollection';
import Link from 'next/link';
import Description from './components/Description';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Your Profile',
  };
}

export default async function MyProfilePage() {
  const _user = await currentUser();
  const user = await trpc.users.getUser({
    reviewLimit: 4,
    showLimit: 6,
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
      sumRatings: show?.sumRatings ?? 0,
      title: show?.title ?? '',
      totalRatings: show?.totalRatings ?? 0,
      userIdentifier: user?.username ?? '',
    };
  });
  return (
    <>
      <div className="min-h-[95vh] pb-10">
        <h2 className="font-bold mt-10 text-3xl lg:text-5xl text-center">Your Profile</h2>
        <p className="text-center">
          <Link className="text-primary-dark underline" href={`/users/${user?.username}`}>
            View Your Public Profile
          </Link>
        </p>
        <Description description={user?.description ?? ''} username={user?.username} />
        {watchedShows && <PlaybillCollection isPrivate shows={watchedShows} />}
        {watchedShows && watchedShows.length >= 6 && (
          <Link
            className="float-end mr-8 text-primary-dark underline"
            href="/my-profile/playbill-collection"
          >
            View The Whole Collection
          </Link>
        )}
      </div>
      <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
        <h2 className="font-medium text-xl lg:text-3xl">{`${user?.username ?? 'User'}'s Reviews`}</h2>
        <ReviewCollection isPrivate reviews={user?.reviews ?? []} />
        {user?.reviews && user.reviews.length >= 4 && (
          <Link
            className="float-end text-black underline"
            href={`/users/${user?.username}/reviews`}
          >
            View All Reviews
          </Link>
        )}
      </div>
    </>
  );
}
