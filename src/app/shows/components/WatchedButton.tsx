'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/badge';
import { Check } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function WatchedButton({
  id,
  isWatched,
  setIsWatched,
  userId,
}: {
  id: string;
  isWatched: boolean;
  setIsWatched: (isWatched: boolean) => void;
  userId: string | undefined;
}) {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
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
              router.refresh();
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
            router.refresh();
          }}
        >
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
