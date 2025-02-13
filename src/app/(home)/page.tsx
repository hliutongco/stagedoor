import { Metadata } from 'next';
import ShowsList from '../components/ShowsList';
import { trpc } from '@/server/clients/server-api';
import { Separator } from '@/components/ui/';
import StarRating from '@/components/core/star-rating';
import Link from 'next/link';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import Image from 'next/image';
import { transformCharacters } from '@/lib/utils/index';
import ReviewBody from '../components/ReviewBody';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const [musicals, plays, reviews] = await Promise.all([
    trpc.shows.getMusicals(),
    trpc.shows.getPlays(),
    trpc.reviews.getReviews({ limit: 10 }),
  ]);

  return (
    <main>
      <div className="min-h-[95vh] mb-10 p-10">
        <h2 className="font-bold text-3xl lg:text-5xl text-center">Now Showing</h2>
        <div className="mt-5">
          <h3 className="font-medium text-xl lg:text-3xl">Musicals</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">
            {musicals && <ShowsList shows={musicals} />}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium text-xl lg:text-3xl">Straight Plays</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{plays && <ShowsList shows={plays} />}</div>
        </div>
      </div>
      <div className="bg-primary-light min-h-[95vh] p-10">
        <h3 className="font-medium text-xl lg:text-3xl">Reviews</h3>
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
                <ReviewBody body={review.body} id={review.id} length={300} />
              </div>
              <Link href={`/users/${review.user?.username}`}>
                <div className="absolute bottom-3 flex gap-2 items-center">
                  <Image
                    alt={review.user?.username + 'profile picture'}
                    aria-hidden
                    className="rounded-2xl"
                    height={30}
                    src={review.user?.imageUrl ?? ''}
                    style={{ height: 'auto', width: 'auto' }}
                    width={30}
                  />
                  {review.user?.username}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
