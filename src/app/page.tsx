import { Metadata } from 'next';
import ShowsList from './components/ShowsList';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ShowsList />
      </main>
    </div>
  );
}

// TODO: eventually add in a footer
{
  /* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */
}
