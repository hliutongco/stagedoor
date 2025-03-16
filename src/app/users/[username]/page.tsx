import PlaybillCollection from '@/app/my-profile/components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import ReviewCollection from '@/app/components/ReviewCollection';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  return {
    title: `${username ?? 'User'}'s Profile`,
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const user = await trpc.users.getUser({
    reviewLimit: 4,
    showLimit: 6,
    username,
  });
  const allShows = user?.userShows.map((userShow) => {
    const show = userShow.show;
    return {
      id: show?.id ?? '',
      playbillImage: show?.playbillImage ?? '',
      rating: `${userShow.rating}`,
      slug: show?.slug ?? '',
      sumRatings: show?.sumRatings ?? 0,
      title: show?.title ?? '',
      totalRatings: show?.totalRatings ?? 0,
    };
  });
  const watchedShows = allShows?.slice(0, 6);
  return (
    <>
      <div className="min-h-[95vh] pb-10">
        <h2 className="font-bold text-3xl lg:text-5xl mt-10 text-center">
          {user?.username ?? 'User'}
        </h2>
        <div className="flex gap-4 items-center justify-center my-3">
          <div className="flex flex-col text-center">
            <p className="text-xl lg:text-2xl">{allShows?.length ?? '0'}</p>
            <p className="text-base lg:text-xl">Shows</p>
          </div>

          <div className="flex flex-col text-center">
            <p className="text-xl lg:text-2xl">{user?.reviews.length ?? '0'}</p>
            <p className="text-base lg:text-xl">Reviews</p>
          </div>
        </div>
        <p className="mb-4 mx-auto max-w-fit w-3/4 lg:w-1/2">{user?.description}</p>
        {watchedShows && <PlaybillCollection shows={watchedShows} />}
        {watchedShows && watchedShows.length >= 6 && (
          <Link
            className="float-end mr-8 text-primary-dark underline"
            href={`/users/${user?.username}/playbill-collection`}
          >
            View The Whole Collection
          </Link>
        )}
      </div>
      <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
        <h2 className="font-medium text-xl lg:text-3xl">{`${user?.username ?? 'User'}'s Reviews`}</h2>
        <ReviewCollection reviews={user?.reviews ?? []} />
        {user?.reviews && user.reviews.length >= 4 && (
          <Link
            className="float-end text-primary-dark underline"
            href={`/users/${user?.username}/reviews`}
          >
            View All Reviews
          </Link>
        )}
      </div>
    </>
  );
}
