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
    <Carousel className="w-full">
      <CarouselContent className="ml-1">
        {shows.map((show) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/5" key={show.id}>
            <Link href={`/shows/${show.slug}`}>
              <Image
                alt={show.title}
                height={276}
                priority
                src={show.playbillImage}
                style={{ height: '276px', width: '175px' }}
                width={175}
              />
              <p className="hover:underline">
                {show.title} ({show.year})
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
