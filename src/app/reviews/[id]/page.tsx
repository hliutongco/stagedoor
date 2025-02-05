import CloudinaryImage from '@/app/components/CloudinaryImage';
import IsLoadingProvider from '@/app/components/IsLoadingProvider';
import ReviewBody from '@/app/components/ReviewBody';
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
      <Link className="block mx-auto w-fit" href={`/users/${review.user?.username}`}>
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
      <IsLoadingProvider isLoading={false}>
        {user?.id === review.userId && (
          <div className="flex justify-end">
            <ReviewCard review={review} />
          </div>
        )}
        <div className="flex flex-col md:float-left items-center pb-8 px-10 p-2">
          <Link className="text-center" href={`/shows/${review.show?.slug}`}>
            <CloudinaryImage
              alt={review.show?.title ?? ''}
              className="rounded-sm"
              height={315}
              priority
              src={transformCharacters(review.show?.slug ?? '')}
              style={{ width: '200px', height: '315px' }}
              width={200}
            />
            {review.show?.title}
          </Link>
          {review.userShow?.rating !== '0' && (
            <StarRating name={review.title} value={`${review.userShow.rating}`} />
          )}
        </div>
        <ReviewBody body={review.body} displayFullText />
      </IsLoadingProvider>
    </div>
  );
}
