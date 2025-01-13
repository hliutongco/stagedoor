import { Metadata } from 'next';
import ShowsList from './components/ShowsList';
import { trpc } from '@/server/clients/server-api';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const shows = await trpc.shows.getShows();

  return (
    <main>
      <div className="min-h-screen mb-10 sm:p-10">
        <h2 className="font-bold text-5xl text-center">Now Showing</h2>
        <div className="mt-5">
          <h3 className="font-medium text-3xl">Musicals</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{shows && <ShowsList shows={shows} />}</div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium text-3xl">Straight Plays</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{shows && <ShowsList shows={shows} />}</div>
        </div>
      </div>
      <div className="bg-primary min-h-screen sm:p-10"></div>
    </main>
  );
}
