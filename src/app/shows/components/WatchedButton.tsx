'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/badge';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Spinner } from '@/components/spinner';

export default function WatchedButton({
  id,
  isWatched: _isWatched,
  userId = '',
}: {
  id: string;
  isWatched: boolean;
  userId: string | undefined;
}) {
  const { redirectToSignIn } = useClerk();
  const [isWatched, setIsWatched] = useState(_isWatched);
  const createMutation = trpc.watchedShows.addWatchedShow.useMutation({
    onError: (error) => {
      if (error.message.includes('UNAUTHORIZED')) {
        redirectToSignIn();
      }
    },
    onSuccess: () => {
      setIsWatched(true);
    },
  });
  const removeMutation = trpc.watchedShows.removeWatchedShow.useMutation({
    onError: (error) => {
      if (error.message.includes('UNAUTHORIZED')) {
        redirectToSignIn();
      }
    },
  });

  return (
    <>
      {createMutation.isPending && <Spinner size="small" />}
      {isWatched && (
        <>
          <Badge variant="secondary">
            <Check className="mr-1" size="20" /> I&apos;ve Seen This!
          </Badge>
          <span
            className="hover:underline text-sm"
            onClick={() => {
              removeMutation.mutate({ showId: id, userId });
              setIsWatched(false);
            }}
            role="button"
          >
            Click to mark as not watched
          </span>
        </>
      )}
      {!isWatched && !createMutation.isPending && (
        <Button
          onClick={() => {
            createMutation.mutate({ showId: id, userId });
          }}
        >
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
