import Link from 'next/link';
import Image from 'next/image';
import { shows as Show } from '@/db/schema';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
          <CarouselItem className="sm:basis-1/3 lg:basis-1/5" key={show.id}>
            <Link className="contents" href={`/shows/${show.slug}`}>
              <Image
                alt={show.title}
                height={276}
                priority
                src={show.playbillImage}
                width={175}
              />
              <span className="hover:underline">
                {show.title} ({show.year})
              </span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:bg-primary" />
      <CarouselNext className="hover:bg-primary" />
    </Carousel>
  );
}
