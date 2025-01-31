import PlaybillCollection from '@/app/my-profile/components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import ReviewCollection from '@/app/my-profile/components/ReviewCollection';

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await trpc.users.getUser({
    username,
  });
  const watchedShows = user?.userShows.map((userShow) => {
    const show = userShow.show;
    return {
      id: show?.id ?? '',
      playbillImage: show?.playbillImage ?? '',
      rating: `${userShow.rating}`,
      slug: show?.slug ?? '',
      sumRatings: show?.sumRatings ?? 0,
      totalRatings: show?.totalRatings ?? 0,
      title: show?.title ?? '',
    };
  });
  return (
    <>
      <h1 className="font-bold text-xl lg:text-3xl mt-10 text-center">
        {user?.username ?? 'User'}
      </h1>
      <div className="flex gap-4 items-center justify-center my-3">
        <div className="flex flex-col text-center">
          <span className="text-xl lg:text-2xl">{watchedShows?.length ?? '0'}</span>
          <span className="text-base lg:text-xl">Shows</span>
        </div>

        <div className="flex flex-col text-center">
          <span className="text-xl lg:text-2xl">{user?.reviews.length ?? '0'}</span>
          <span className="text-base lg:text-xl">Reviews</span>
        </div>
      </div>
      <p className="mb-4 mx-auto max-w-fit w-3/4 lg:w-1/2">{user?.description}</p>
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
      <ReviewCollection reviews={user?.reviews ?? []} />
    </>
  );
}
