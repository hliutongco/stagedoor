import { currentUser } from '@clerk/nextjs/server';
import ReviewCollection from '../../components/ReviewCollection';
import { trpc } from '@/server/clients/server-api';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const _user = await currentUser();
  return {
    title: `${_user?.username ?? 'User'}'s Playbill Collection`,
  };
}

export default async function MyProfileReviewCollection() {
  const _user = await currentUser();
  const user = await trpc.users.getUser({
    username: _user?.username ?? '',
  });
  return (
    <div className="min-h-[95vh]">
      <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
        <h2 className="font-medium text-xl lg:text-3xl">{`${user?.username ?? 'User'}'s Reviews`}</h2>
        <ReviewCollection isPrivate reviews={user?.reviews ?? []} />
      </div>
    </div>
  );
}
