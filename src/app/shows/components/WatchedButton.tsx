'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk, useUser } from '@clerk/nextjs';

export default function WatchedButton({ id }: { id: string }) {
  const { user } = useUser();
  const { redirectToSignIn } = useClerk();
  const mutation = trpc.watchedShows.addWatchedShow.useMutation({
    onSuccess: (response) => {
      console.log('Success', response);
    },
    onError: (error) => {
      if (error.message.includes('UNAUTHORIZED')) {
        redirectToSignIn();
      }
    },
  });

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
