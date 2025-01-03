'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/badge';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/hooks/use-toast';

export default function WatchedButton({
  id,
  isWatched: _isWatched,
  userId,
}: {
  id: string;
  isWatched: boolean;
  userId: string | undefined;
}) {
  const { redirectToSignIn } = useClerk();
  const [isWatched, setIsWatched] = useState(_isWatched);
  const { toast } = useToast();
  const createMutation = trpc.watchedShows.addWatchedShow.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });
  const removeMutation = trpc.watchedShows.removeWatchedShow.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
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
              if (!userId) {
                redirectToSignIn();
                return;
              }
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
            if (!userId) {
              redirectToSignIn();
              return;
            }
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
