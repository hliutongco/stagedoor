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
    <main>
      <div className="grid grid-rows-[20lopx_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="font-bold text-5xl">Current Musicals</h1>
          <div>{shows && <ShowsList shows={shows} />}</div>
        </div>
      </div>
      <div className="bg-primary grid grid-rows-[20lopx_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black">
          <h1 className="font-bold text-5xl">Current Straight Plays</h1>
          <div>{shows && <ShowsList shows={shows} />}</div>
        </div>
      </div>
      <footer className="bg-black flex gap-6 items-center justify-between p-3 row-start-3 ">
        <span className="text-primary text-sm">made by helen ♡</span>
      </footer>
    </main>
  );
}
