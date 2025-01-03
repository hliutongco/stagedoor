'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useUser } from '@clerk/nextjs';

export default function WatchedButton({ id }: { id: string }) {
  const { user } = useUser();
  const mutation = trpc.watchedShows.addWatchedShow.useMutation();

  return (
    <Button
      onClick={() => {
        mutation.mutate({ showId: id, userId: user?.id ?? '' });
      }}
    >
      I&apos;ve seen this!
    </Button>
  );
}
