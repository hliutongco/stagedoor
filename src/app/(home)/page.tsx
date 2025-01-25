import { Metadata } from 'next';
import ShowsList from '../components/ShowsList';
import { trpc } from '@/server/clients/server-api';
import { Separator } from '@/components/ui/';
import StarRating from '@/components/core/star-rating';
import Link from 'next/link';
import CloudinaryImage from '@/app/components/CloudinaryImage';
import Image from 'next/image';
import { transformCharacters } from '@/lib/utils/index';

export const metadata: Metadata = {
  title: 'StageDoor',
  description: 'The social network for theater lovers',
};

export default async function Home() {
  const musicals = await trpc.shows.getMusicals();
  const plays = await trpc.shows.getPlays();
  const reviews = await trpc.reviews.getReviews();

  return (
    <main>
      <div className="min-h-screen mb-10 sm:p-10">
        <h2 className="font-bold sm:text-3xl lg:text-5xl text-center">Now Showing</h2>
        <div className="mt-5">
          <h3 className="font-medium sm:text-xl lg:text-3xl">Musicals</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">
            {musicals && <ShowsList shows={musicals} />}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium sm:text-xl lg:text-3xl">Straight Plays</h3>
          <Separator className="mb-3 bg-secondary" />
          <div className="mx-auto w-3/4">{plays && <ShowsList shows={plays} />}</div>
        </div>
      </div>
      <div className="bg-primary min-h-screen sm:p-10">
        <h3 className="font-medium sm:text-xl lg:text-3xl">Reviews</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center mt-8">
          {reviews.map((review) => (
            <div
              className="bg-background flex flex-col h-full mb-10 p-4 relative rounded-md w-full"
              key={review.id}
            >
              <h4 className="font-bold text-center sm:text-lg lg:text-xl">
                {review.title}
              </h4>
              <div className="mx-auto">
                <StarRating name={review.id} value={`${review.userShow.rating}`} />
              </div>
              <div className="mt-2">
                <CloudinaryImage
                  alt={review.show?.title ?? ''}
                  className="float-left px-2"
                  height={150}
                  src={transformCharacters(review.show?.slug ?? '')}
                  width={100}
                />
                {review.body.length > 1000 ? (
                  <>
                    <span>{review.body.slice(0, 300) + '...'}</span>
                    <Link
                      className="ml-2 text-primary text-right text-sm"
                      href={`/reviews/${review.id}`}
                    >
                      Click to read more
                    </Link>
                  </>
                ) : (
                  <span>{review.body}</span>
                )}
              </div>
              <Link href={`/users/${review.user?.username}`}>
                <div className="absolute bottom-3 flex gap-2 items-center">
                  <Image
                    alt={review.user?.username + 'profile picture'}
                    className="rounded-2xl"
                    height={30}
                    src={review.user?.imageUrl ?? ''}
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
