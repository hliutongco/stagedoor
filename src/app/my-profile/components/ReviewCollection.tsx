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
    <div className="bg-primary-light items-center justify-items-center min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
      <h2 className="font-bold mb-4 text-lg lg:text-2xl text-center">Reviews</h2>
      {!reviews.length && <div className="text-center">Nothing for now!</div>}
      {Boolean(reviews.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {reviews.map((review) => (
            <div
              className="bg-background col-span-1 flex flex-col h-full my-4 p-4 relative rounded-md"
              key={review.id}
            >
              <div className="flex flex-col items-center">
                <Link href={`/shows/${review.show?.slug}`}>
                  <CloudinaryImage
                    alt={review.show?.title ?? ''}
                    height={200}
                    src={transformCharacters(review.show?.slug ?? '')}
                    style={{ height: 'auto', width: 'auto' }}
                    width={100}
                  />
                </Link>
                <span>{review.show?.title}</span>
                {Boolean(review.userShow?.rating) && review.userShow?.rating !== '0' && (
                  <StarRating
                    name={`${review.id ?? ''}-review`}
                    value={`${review.userShow?.rating}`}
                  />
                )}
              </div>
              <Link className="w-fit" href={`/reviews/${review.id}`}>
                <span className="block font-bold text-lg underline">{review.title}</span>
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
          ))}
        </div>
      )}
    </div>
  );
}
