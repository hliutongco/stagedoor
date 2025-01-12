import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/core/star-rating/static';

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
      <h2 className="font-bold text-2xl">Your Playbill Collection</h2>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {!shows.length && (
          <div className="text-center text-sm">
            Rate or Review a show to add it to your collection!
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          {shows.map((show) => (
            <div key={show.id}>
              <Link href={`/shows/${show.slug}`}>
                <Image
                  alt={show.title}
                  height={200}
                  src={show.playbillImage}
                  width={200}
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
