import CloudinaryImage from '@/app/components/CloudinaryImage';
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
    <div className="bg-primary-light items-center justify-items-center min-h-screen pb-20 gap-16 p-4 lg:p-8 text-black">
      <h2 className="font-bold mb-4 text-lg lg:text-2xl text-center">Reviews</h2>
      {!reviews.length && <div className="text-center">Nothing for now!</div>}
      {Boolean(reviews.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full 2xl:w-auto">
          {reviews.map((review) => (
            <div
              className="bg-background col-span-1 flex flex-col h-full my-4 p-4 relative rounded-md"
              key={review.id}
            >
              <Link href={`/reviews/${review.id}`} key={review.id}>
                <div className="flex flex-col items-center">
                  <CloudinaryImage
                    alt={review.show?.title ?? ''}
                    height={200}
                    src={transformCharacters(review.show?.slug ?? '')}
                    width={100}
                  />
                  <span>{review.show?.title}</span>
                  {review.userShow?.rating !== '0' && (
                    <StarRating
                      name={`${review.id ?? ''}-review`}
                      value={`${review.userShow?.rating}`}
                    />
                  )}
                </div>
                <p className="font-bold">{review.title}</p>
                <div className="whitespace-pre-wrap">
                  {review.body.length > 1000 ? (
                    <>
                      <p>{review.body.slice(0, 300)}...</p>
                      <span className="float-right text-sm">Click to read more</span>
                    </>
                  ) : (
                    <p>{review.body}</p>
                  )}
                </div>
              </Link>
              {isPrivate && (
                <div className="absolute bottom-4 right-4">
                  <ReviewCard review={review} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
