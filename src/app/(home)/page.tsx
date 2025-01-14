import { Metadata } from 'next';
import ShowsList from '../components/ShowsList';
import { trpc } from '@/server/clients/server-api';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const musicals = await trpc.shows.getMusicals();
  const plays = await trpc.shows.getPlays();

  return (
    <main>
      <div className="min-h-screen mb-10 sm:p-10">
        <h2 className="font-bold sm:text-3xl lg:text-5xl text-center">Now Showing</h2>
        <div className="mt-5">
          <h3 className="font-medium sm:text-xl lg:text-3xl">Musicals</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">
            {musicals && <ShowsList shows={musicals} />}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium sm:text-xl lg:text-3xl">Straight Plays</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{plays && <ShowsList shows={plays} />}</div>
        </div>
      </div>
      <div className="bg-primary min-h-screen sm:p-10"></div>
    </main>
  );
}
