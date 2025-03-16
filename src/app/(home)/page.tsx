import { Metadata } from 'next';
import ShowsList from '../components/ShowsList';
import { trpc } from '@/server/clients/server-api';
import { Separator } from '@/components/ui/';
import ReviewCollection from '@/app/components/ReviewCollection';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const [musicals, plays, reviews] = await Promise.all([
    trpc.shows.getMusicals(),
    trpc.shows.getPlays(),
    trpc.reviews.getReviews({ limit: 10 }),
  ]);

  return (
    <main>
      <div className="min-h-[95vh] mb-10 p-10">
        <h2 className="font-bold text-3xl lg:text-5xl text-center">Now Showing</h2>
        <div className="mt-5">
          <h3 className="font-medium text-xl lg:text-3xl">Musicals</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">
            {musicals && <ShowsList shows={musicals} />}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium text-xl lg:text-3xl">Straight Plays</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{plays && <ShowsList shows={plays} />}</div>
        </div>
      </div>
      <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
        <h2 className="font-medium text-xl lg:text-3xl">Reviews</h2>
        <ReviewCollection displayUser reviews={reviews} />
      </div>
    </main>
  );
}
