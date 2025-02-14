import { currentUser } from '@clerk/nextjs/server';
import PlaybillCollection from '../components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Your Playbill Collection',
  };
}

export default async function MyProfilePlaybillPage() {
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
      sumRatings: show?.sumRatings ?? 0,
      title: show?.title ?? '',
      totalRatings: show?.totalRatings ?? 0,
      userId: user?.clerkId ?? '',
    };
  });
  return (
    <div className="min-h-[95vh] py-10">
      <p className="text-center">
        <Link className="text-primary-dark underline" href="/my-profile">
          Go Back To Your Profile
        </Link>
      </p>
      {watchedShows && <PlaybillCollection isPrivate shows={watchedShows} />}
    </div>
  );
}
