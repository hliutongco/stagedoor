import Link from 'next/link';
import { trpc } from '../../server/clients/server-api';
import Image from 'next/image';

export default async function ShowsList() {
  const shows = await trpc.shows.getShows();
  return (
    <div>
      <h1>Current Shows</h1>
      <div className="grid grid-cols-4 gap-4">
        {shows.map((show) => (
          <div key={show.id}>
            <Link href={`/shows/${show.id}`}>
              <Image alt={show.title} height={200} src={show.playbillImage} width={200} />
              <span>{show.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
