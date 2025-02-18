import Link from 'next/link';
import StarRatingStatic from '@/components/core/star-rating';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import { transformCharacters } from '@/lib/utils/index';
import StarRating from '@/app/shows/components/star-rating/dynamic';
import { Separator } from '@/components/ui';

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
    userIdentifier?: string;
  }[];
}

export default function PlaybillCollection({ isPrivate, shows }: ShowsListProps) {
  return (
    <>
      <div className="mx-10">
        <h2 className="font-medium text-xl lg:text-3xl">Playbill Collection</h2>
        <Separator className="bg-secondary" />
      </div>
      <div className="items-center justify-items-center pb-10 gap-16 p-4 lg:p-8">
        {!shows.length && (
          <div className="text-center text-sm">
            Rate or Review a show to add it to your collection!
          </div>
        )}
        <div
          className={`grid ${isPrivate ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-6 gap-4 ${!isPrivate && 'mx-8 lg:mx-0'}`}
        >
          {shows.map((show) => (
            <div className="flex flex-col items-center" key={show.id}>
              <Link href={`/shows/${show.slug}`}>
                <CloudinaryImage
                  alt={show.title}
                  height={276}
                  src={transformCharacters(show.slug)}
                  style={{ height: 'auto', width: 'auto' }}
                  width={175}
                />
              </Link>

              {show.rating !== '0' && !isPrivate && (
                <StarRatingStatic name={show.title} value={show.rating} />
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
                  userIdentifier={show.userIdentifier ?? ''}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
