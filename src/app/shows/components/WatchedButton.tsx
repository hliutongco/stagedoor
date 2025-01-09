'use client';
import { Button } from '@/components/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/badge';
import { Check } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface WatchedButtonProps {
  hasRatingOrReview: boolean;
  id: string | undefined;
  isWatched: boolean;
  setIsWatched: (isWatched: boolean) => void;
  showId: string;
  userId: string | undefined;
}

export default function WatchedButton({
  hasRatingOrReview,
  id,
  isWatched,
  setIsWatched,
  showId,
  userId,
}: WatchedButtonProps) {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { toast } = useToast();
  const createMutation = trpc.userShows.createWithWatchedShow.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });
  const updateMutation = trpc.userShows.toggleWatchedShow.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });
  const deleteMutation = trpc.userShows.deleteEmptyRecord.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });
  const handleClick = useCallback(
    (value: boolean) => {
      if (!userId) {
        redirectToSignIn();
        return;
      }
      if (hasRatingOrReview && !value) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            'This show cannot be marked as not watched because of a rating or review',
        });
        return;
      }
      if (id) {
        updateMutation.mutate({ id, value });
        if (!value) {
          deleteMutation.mutate({ id });
        }
        setIsWatched(value);
      } else {
        createMutation.mutate({ showId, userId });
        setIsWatched(value);
      }
      router.refresh();
    },
    [
      createMutation,
      hasRatingOrReview,
      id,
      redirectToSignIn,
      router,
      setIsWatched,
      showId,
      toast,
      updateMutation,
      userId,
    ],
  );

  return (
    <>
      {isWatched && (
        <>
          <Badge variant="secondary">
            <Check className="mr-1" size="20" /> I&apos;ve Seen This!
          </Badge>
          <span
            className="hover:underline text-sm"
            onClick={() => handleClick(false)}
            role="button"
          >
            Click to mark as not watched
          </span>
        </>
      )}
      {!isWatched && (
        <Button onClick={() => handleClick(true)}>I&apos;ve Seen This!</Button>
      )}
    </>
  );
}
