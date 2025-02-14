import PlaybillCollection from '@/app/my-profile/components/PlaybillCollection';
import { trpc } from '@/server/clients/server-api';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = (await params).username;
  return {
    title: `${username ?? 'User'}'s Playbill Collection`,
  };
}

export default async function UserPlaybillPage({ params }: Props) {
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
    <div className="min-h-[95vh] py-10">
      <p className="text-center">
        <Link className="text-primary-dark underline" href={`/users/${user?.username}`}>
          Go Back To {user?.username ?? 'The User'}&apos;s Full Profile
        </Link>
      </p>
      {watchedShows && <PlaybillCollection shows={watchedShows} />}
    </div>
  );
}
