import Image from 'next/image';
import { default as StarRatingStatic } from '@/components/core/star-rating';
import ReviewActions from '@/app/components/ReviewActions';
import Link from 'next/link';
import ReviewBody from '@/app/components/ReviewBody';
import IsLoadingProvider from '@/app/components/IsLoadingProvider';
import { reviews as Review, users as User, userShows as UserShow } from '@/db/schema';

type Review = typeof Review.$inferSelect;

interface ReviewWithRelations extends Review {
  user: typeof User.$inferSelect | null;
  userShow: typeof UserShow.$inferSelect | null;
}

export default function ReviewContainer({
  review,
  username,
}: {
  review: ReviewWithRelations;
  username: string | null | undefined;
}) {
  return (
    <div className="bg-background lg:min-h-[200px] mt-4 rounded-md" key={review.id}>
      <Link href={`/users/${review.user?.username}`}>
        <div className="flex flex-col float-left items-center p-4 mx-4 text-center text-sm">
          <Image
            alt={review.user?.username + 'profile picture'}
            aria-hidden
            className="rounded-md"
            height={50}
            src={review.user?.imageUrl ?? ''}
            style={{ height: 'auto', width: 'auto' }}
            width={50}
          />
          {review.user?.username}
        </div>
      </Link>
      <IsLoadingProvider isLoading={false}>
        <div className="col-span-3 lg:col-span-4 p-4">
          <div className="flex font-bold gap-2 justify-between pb-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <Link href={`/reviews/${review.id}`}>
                <span className="text-base md:text-lg underline">{review.title}</span>
              </Link>
              {Boolean(review.userShow?.rating) && review.userShow?.rating !== '0' && (
                <StarRatingStatic name={review.id} value={`${review.userShow?.rating}`} />
              )}
            </div>
            {username === review.userIdentifier && <ReviewActions review={review} />}
          </div>
          <ReviewBody body={review.body} id={review.id} />
        </div>
      </IsLoadingProvider>
    </div>
  );
}
