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
      title: show?.title ?? '',
    };
  });
  return (
    <>
      <h1 className="font-bold sm:text-3xl lg:text-5xl mt-10 text-center">
        {user?.username ?? 'User'}&apos;s Profile
      </h1>
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
      <ReviewCollection reviews={user?.reviews ?? []} />
    </>
  );
}
