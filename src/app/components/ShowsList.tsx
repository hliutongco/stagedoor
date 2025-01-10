import Link from 'next/link';
import Image from 'next/image';
import { shows as Show } from '@/db/schema';

export default async function ShowsList({
  shows,
}: {
  shows: (typeof Show.$inferSelect)[];
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {shows.map((show) => (
        <div key={show.id}>
          <Link href={`/shows/${show.slug}`}>
            <Image alt={show.title} height={200} src={show.playbillImage} width={200} />
            <span>{show.title}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
