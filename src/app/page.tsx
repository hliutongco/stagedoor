import { Metadata } from 'next';
import ShowsList from './components/ShowsList';
import { trpc } from '@/server/clients/server-api';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const shows = await trpc.shows.getShows();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Current Shows</h1>
        <div>{shows && <ShowsList shows={shows} />}</div>
      </main>
    </div>
  );
}

// TODO: eventually add in a footer
{
  /* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */
}
