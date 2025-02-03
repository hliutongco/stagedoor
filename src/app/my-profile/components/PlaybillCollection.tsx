import Link from 'next/link';
import StarRatingStatic from '@/components/core/star-rating';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import { transformCharacters } from '@/lib/utils/index';
import StarRating from '@/app/shows/components/star-rating/dynamic';

interface ShowsListProps {
  isPrivate?: boolean;
  shows: {
    id: string;
    hasRatingOrReview?: boolean;
    playbillImage: string;
    rating: string;
    showId?: string;
    slug: string;
    sumRatings: string | number;
    title: string;
    totalRatings: number;
    userId?: string;
  }[];
}

export default function PlaybillCollection({ isPrivate, shows }: ShowsListProps) {
  return (
    <>
      <h2 className="font-bold text-lg lg:text-2xl text-center">Playbill Collection</h2>
      <div className="items-center justify-items-center min-h-screen pb-20 gap-16 p-4 lg:p-8">
        {!shows.length && (
          <div className="text-center text-sm">
            Rate or Review a show to add it to your collection!
          </div>
        )}
        <div
          className={`grid ${isPrivate ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-6 gap-4`}
        >
          {shows.map((show) => (
            <div key={show.id}>
              <Link href={`/shows/${show.slug}`}>
                <CloudinaryImage
                  alt={show.title}
                  height={276}
                  src={transformCharacters(show.slug)}
                  style={{ width: 'auto', height: 'auto' }}
                  width={175}
                />
              </Link>

              {show.rating !== '0' && !isPrivate && (
                <div className="flex justify-center">
                  <StarRatingStatic name={show.title} value={show.rating} />
                </div>
              )}
              {isPrivate && (
                <StarRating
                  hasRatingOrReview={show.hasRatingOrReview ?? false}
                  id={show.id}
                  name={show.title}
                  rating={show.rating}
                  showId={show.showId ?? ''}
                  sumRatings={show.sumRatings}
                  totalRatings={show.totalRatings}
                  userId={show.userId ?? ''}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
