import Link from 'next/link';
import Image from 'next/image';
import { shows as Show } from '@/db/schema';

export default async function ShowsList({
  shows,
}: {
  shows: (typeof Show.$inferSelect)[];
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {shows.map((show) => (
        <div key={show.id}>
          <Link href={`/shows/${show.slug}`}>
            <Image
              alt={show.title}
              height={315}
              priority
              src={show.playbillImage}
              style={{ height: '315px', width: '200px' }}
              width={200}
            />
            <p className="hover:underline">
              {show.title} ({show.year})
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
