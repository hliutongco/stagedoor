import CloudinaryImage from '@/app/components/CloudinaryImage';
import IsLoadingProvider from '@/app/components/IsLoadingProvider';
import ReviewBody from '@/app/components/ReviewBody';
import ReviewCard from '@/app/components/ReviewCard';
import StarRating from '@/components/core/star-rating';
import { reviews as Review, shows as Show, userShows as UserShow } from '@/db/schema';
import { transformCharacters } from '@/lib/utils/index';
import Link from 'next/link';

type Review = typeof Review.$inferSelect;

interface ReviewCollection extends Review {
  show: typeof Show.$inferSelect | null;
  userShow: typeof UserShow.$inferSelect | null;
}

export default function ReviewCollection({
  isPrivate,
  reviews,
}: {
  isPrivate?: boolean;
  reviews: ReviewCollection[];
}) {
  return (
    <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
      <h2 className="font-medium text-xl lg:text-3xl">Reviews</h2>
      {!reviews.length && <div className="text-center">Nothing for now!</div>}
      {Boolean(reviews.length) && (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center mt-8">
          {reviews.map((review) => (
            <div
              className="bg-background flex flex-col h-full mb-10 p-4 relative rounded-md w-full"
              key={review.id}
            >
              <Link href={`/reviews/${review.id}`}>
                <h4 className="font-bold text-center text-lg lg:text-xl underline">
                  {review.title}
                </h4>
              </Link>
              {Boolean(review.userShow?.rating) && review.userShow?.rating !== '0' && (
                <div className="mx-auto">
                  <StarRating name={review.id} value={`${review.userShow?.rating}`} />
                </div>
              )}
              <div className="mt-2">
                <Link href={`/shows/${review.show?.slug}`}>
                  <CloudinaryImage
                    alt={review.show?.title ?? ''}
                    className="float-left mx-2"
                    height={150}
                    src={transformCharacters(review.show?.slug ?? '')}
                    style={{ height: '150px', width: '100px' }}
                    width={100}
                  />
                </Link>
                <IsLoadingProvider isLoading={false}>
                  <ReviewBody body={review.body} id={review.id} length={300} />
                  {isPrivate && (
                    <div className="absolute bottom-4 right-4">
                      <ReviewCard review={review} />
                    </div>
                  )}
                </IsLoadingProvider>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
