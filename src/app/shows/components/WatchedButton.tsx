'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/badge';
import { Check } from 'lucide-react';
import  { useState } from 'react';

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
    onSuccess: (response) => {
      console.log('Success', response);
    },
    onError: (error) => {
      if (error.message.includes('UNAUTHORIZED')) {
        redirectToSignIn();
      }
    },
  });
  const removeMutation = trpc.watchedShows.removeWatchedShow.useMutation({
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
    <>
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
      {!isWatched && (
        <Button
          onClick={() => {
            createMutation.mutate({ showId: id, userId });
            setIsWatched(true);
          }}
        >
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
