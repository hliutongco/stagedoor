import CloudinaryImage from '@/app/components/CloudinaryImage';
import IsLoadingProvider from '@/app/components/IsLoadingProvider';
import ReviewBody from '@/app/components/ReviewBody';
import ReviewActions from '@/app/components/ReviewActions';
import StarRating from '@/components/core/star-rating';
import {
  reviews as Review,
  shows as Show,
  users as User,
  userShows as UserShow,
} from '@/db/schema';
import { transformCharacters } from '@/lib/utils/index';
import Link from 'next/link';
import Image from 'next/image';

type Review = typeof Review.$inferSelect;

interface ReviewCollection extends Review {
  show: typeof Show.$inferSelect | null;
  user?: typeof User.$inferSelect | null;
  userShow: typeof UserShow.$inferSelect | null;
}

export default function ReviewCollection({
  displayUser,
  isPrivate,
  reviews,
}: {
  displayUser?: boolean;
  isPrivate?: boolean;
  reviews: ReviewCollection[];
}) {
  return (
    <div className="bg-primary-light min-h-[95vh] pb-20 gap-16 p-4 lg:p-8 text-black">
      <h2 className="font-medium text-xl lg:text-3xl">Reviews</h2>
      {!reviews.length && <div className="text-center">Nothing for now!</div>}
      {Boolean(reviews.length) && (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center mt-8">
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
                      <ReviewActions review={review} />
                    </div>
                  )}
                  {displayUser && review?.user && (
                    <Link href={`/users/${review.user.username}`}>
                      <div className="absolute bottom-3 flex gap-2 items-center">
                        <Image
                          alt={review.user.username + 'profile picture'}
                          aria-hidden
                          className="rounded-2xl"
                          height={30}
                          src={review.user.imageUrl ?? ''}
                          style={{ height: 'auto', width: 'auto' }}
                          width={30}
                        />
                        {review.user?.username}
                      </div>
                    </Link>
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
