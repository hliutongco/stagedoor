import ReviewCollection from '@/app/components/ReviewCollection';
import { trpc } from '@/server/clients/server-api';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  return {
    title: `${username ?? 'User'}'s Reviews`,
  };
}

export default async function MyProfileReviewCollection({ params }: Props) {
  const _username = (await params).username;
  const user = await trpc.users.getUser({
    username: _username ?? '',
  });
  return (
    <div className="min-h-[95vh]">
      <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
        <h2 className="font-medium text-xl lg:text-3xl">{`${_username ?? 'User'}'s Reviews`}</h2>
        <ReviewCollection reviews={user?.reviews ?? []} />
      </div>
    </div>
  );
}
