import StarRating from '@/components/core/star-rating';
import { reviews as Review, shows as Show, userShows as UserShow } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';

type Review = typeof Review.$inferSelect;

interface ReviewCollection extends Review {
  show: typeof Show.$inferSelect | null;
  userShow: typeof UserShow.$inferSelect | null;
}

export default function ReviewCollection({ reviews }: { reviews: ReviewCollection[] }) {
  return (
    <div className="bg-primary items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-4 lg:p-8 text-black">
      <h2 className="font-bold mb-4 sm:text-xl lg:text-3xl text-center">Your Reviews</h2>
      {!reviews.length && <div className="text-center">Nothing for now!</div>}
      {reviews.length && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full 2xl:w-auto">
          {reviews.map((review) => (
            <Link href={`/reviews/${review.id}`} key={review.id}>
              <div
                className="bg-white col-span-1 flex flex-col my-4 p-4 rounded-md"
                key={review.id}
              >
                <div className="flex flex-col items-center">
                  <Image
                    alt={review.show?.title ?? ''}
                    height={200}
                    src={review.show?.playbillImage ?? ''}
                    width={100}
                  />
                  <span>{review.show?.title}</span>
                  <StarRating
                    name={`${review.show?.title ?? ''}-review`}
                    value={`${review.userShow?.rating ?? '0'}`}
                  />
                </div>
                <p className="font-bold">{review.title}</p>
                <p>{review.body}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
