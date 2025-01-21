import ReviewCard from '@/app/shows/[slug]/components/ReviewCard';
import { trpc } from '@/server/clients/server-api';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  const review = await trpc.reviews.getReview({ id });
  if (review === undefined) throw new Error('Review not found');
  return (
    <div className="min-h-[95vh] p-6">
      <h2 className="font-bold sm:text-xl lg:text-3xl text-center">{review.title}</h2>
      <span className="flex items-center gap-2 justify-center">
        <Image
          alt={review.user?.username ?? 'review-user'}
          className="rounded-sm"
          height={20}
          src={review.user?.imageUrl ?? ''}
          width={20}
        />
        {review.user?.username ?? `${review.user?.firstName} ${review.user?.lastName}`}
      </span>
      {user?.id === review.userId && (
        <div className="flex justify-end">
          <ReviewCard review={review} />
        </div>
      )}
      <div className="grid grid-cols-4 lg:grid-cols-5">
        <div className="flex flex-col items-center p-2 text-center">
          <Image
            alt={review.show?.title ?? ''}
            className="rounded-sm"
            height={400}
            src={review.show?.playbillImage ?? ''}
            width={200}
          />
          {review.show?.title}
        </div>
        <p className="p-4">{review.body}</p>
      </div>
    </div>
  );
}
