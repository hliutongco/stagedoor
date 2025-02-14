import PlaybillCollection from '@/app/my-profile/components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import ReviewCollection from '@/app/my-profile/components/ReviewCollection';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = (await params).username;
  return {
    title: `${username ?? 'User'}'s Profile`,
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  // TODO: once the drizzle fix is in place, refactor this to use the limit
  const user = await trpc.users.getUser({
    // limit: 6,
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
        <h1 className="font-bold text-xl lg:text-3xl mt-10 text-center">
          {user?.username ?? 'User'}
        </h1>
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
        <Link
          className="float-end mr-8 text-primary-dark underline"
          href={`/users/${user?.username}/playbill-collection`}
        >
          View The Whole Collection
        </Link>
      </div>
      <ReviewCollection reviews={user?.reviews ?? []} />
    </>
  );
}
