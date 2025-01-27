import Link from 'next/link';
import StarRating from '@/components/core/star-rating';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import { transformCharacters } from '@/lib/utils/index';

interface ShowsListProps {
  shows: {
    id: string;
    playbillImage: string;
    rating: string;
    slug: string;
    title: string;
  }[];
}

export default async function PlaybillCollection({ shows }: ShowsListProps) {
  return (
    <>
      <h2 className="font-bold sm:text-lg lg:text-2xl text-center">
        Playbill Collection
      </h2>
      <div className="items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-4 lg:p-8">
        {!shows.length && (
          <div className="text-center text-sm">
            Rate or Review a show to add it to your collection!
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {shows.map((show) => (
            <div key={show.id}>
              <Link href={`/shows/${show.slug}`}>
                <CloudinaryImage
                  alt={show.title}
                  height={276}
                  src={transformCharacters(show.slug)}
                  width={175}
                />
                {show.rating !== '0' && (
                  <StarRating name={show.title} value={show.rating} />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
