import Link from 'next/link';
import { shows as Show } from '@/db/schema';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/';
import CloudinaryImage from './CloudinaryImage';
import { transformCharacters } from '@/lib/utils/index';

export default async function ShowsList({
  shows,
}: {
  shows: (typeof Show.$inferSelect)[];
}) {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true, skipSnaps: true, slidesToScroll: 3 }}
    >
      <CarouselContent className="ml-1">
        {shows.map((show) => (
          <CarouselItem className="basis-1/3 lg:basis-1/5" key={show.id}>
            <Link className="contents" href={`/shows/${show.slug}`}>
              <CloudinaryImage
                alt={show.title}
                height={276}
                priority
                src={transformCharacters(show.slug)}
                width={175}
              />
              <span className="hover:underline">
                {show.title} ({show.year})
              </span>
              {show.averageRating !== '0' && (
                <div className="text-sm">
                  Average Rating:
                  {show.averageRating} / 5
                </div>
              )}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:bg-primary" />
      <CarouselNext className="hover:bg-primary" />
    </Carousel>
  );
}
