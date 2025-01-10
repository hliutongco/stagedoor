import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/core/star-rating/static';

interface ShowsListProps {
  shows: {
    id: string;
    playbillImage: string;
    rating: string;
    slug: string;
    title: string;
  }[];
}

export default async function PlaybillCollection({ shows }: ShowsListProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {shows.map((show) => (
        <div key={show.id}>
          <Link href={`/shows/${show.slug}`}>
            <Image alt={show.title} height={200} src={show.playbillImage} width={200} />
            {show.rating !== '0' && <StarRating value={show.rating} />}
          </Link>
        </div>
      ))}
    </div>
  );
}
