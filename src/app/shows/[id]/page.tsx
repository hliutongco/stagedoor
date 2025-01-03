import { trpc } from '@/server/clients/server-api';
import WatchedButton from '../components/WatchedButton';

export default async function ShowView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [show] = await trpc.shows.getShow({ id });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {show.title}
      <WatchedButton id={id} />
    </div>
  );
}