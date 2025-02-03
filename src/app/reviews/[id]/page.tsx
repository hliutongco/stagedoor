import CloudinaryImage from '@/app/components/CloudinaryImage';
import ReviewCard from '@/app/components/ReviewCard';
import StarRating from '@/components/core/star-rating';
import { transformCharacters } from '@/lib/utils/index';
import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, user] = await Promise.all([params, currentUser()]);
  const review = await trpc.reviews.getReview({ id });
  if (review === undefined) throw new Error('Review not found');
  return (
    <div className="min-h-[95vh] mt-10 p-4 lg:p-8">
      <h2 className="font-bold text-xl lg:text-3xl text-center">{review.title}</h2>
      <Link href={`/users/${review.user?.username}`}>
        <span className="flex items-center gap-2 justify-center">
          <Image
            alt={review.user?.username ?? 'review-user'}
            className="rounded-sm"
            height={20}
            src={review.user?.imageUrl ?? ''}
            width={20}
          />
          {review.user?.username}
        </span>
      </Link>
      {user?.id === review.userId && (
        <div className="flex justify-end">
          <ReviewCard review={review} />
        </div>
      )}
      <div className="">
        <div className="flex flex-col md:float-left items-center pb-8 px-10 p-2">
          <Link className="text-center" href={`/shows/${review.show?.slug}`}>
            <CloudinaryImage
              alt={review.show?.title ?? ''}
              className="rounded-sm"
              height={400}
              src={transformCharacters(review.show?.slug ?? '')}
              width={200}
            />
            {review.show?.title}
          </Link>
          {review.userShow?.rating !== '0' && (
            <StarRating name={review.title} value={`${review.userShow.rating}`} />
          )}
        </div>
        <p className="p-4 whitespace-pre-wrap">{review.body}</p>
      </div>
    </div>
  );
}
