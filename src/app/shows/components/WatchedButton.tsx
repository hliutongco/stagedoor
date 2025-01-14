'use client';
import { Button } from '@/components/ui/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/hooks/use-toast';
// import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface WatchedButtonProps {
  hasRatingOrReview: boolean;
  id: string | undefined;
  isWatched: boolean;
  setIsWatched: (isWatched: boolean) => void;
  showId: string;
  slug: string;
  userId: string | undefined;
}

export default function WatchedButton({
  hasRatingOrReview,
  id,
  isWatched,
  setIsWatched,
  showId,
  // slug,
  userId,
}: WatchedButtonProps) {
  // const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { toast } = useToast();
  const utils = trpc.useContext();
  const createMutation = trpc.userShows.createWithWatchedShow.useMutation({
    onSuccess: () => {
      utils.userShows.getUserShow.invalidate();
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
  });
  const updateMutation = trpc.userShows.toggleWatchedShow.useMutation({
    onSuccess: () => {
      utils.userShows.getUserShow.invalidate();
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
  });
  const deleteMutation = trpc.userShows.deleteEmptyRecord.useMutation({
    onSuccess: () => {
      utils.userShows.getUserShow.invalidate();
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
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
      if (!isWatched && !hasRatingOrReview) {
        createMutation.mutate({ showId, userId });
      } else if (id) {
        updateMutation.mutate({ id, value });
        if (!value) {
          deleteMutation.mutate({ id });
        }
      } else {
        toast({
          description: 'Please refresh the page and try again',
          title: 'Uh oh! Something went wrong.',
          variant: 'destructive',
        });
        return;
      }
      setIsWatched(value);
      // router.refresh();
      // router.push(`/shows/${slug}`);
    },
    [
      createMutation,
      deleteMutation,
      hasRatingOrReview,
      id,
      isWatched,
      redirectToSignIn,
      // router,
      setIsWatched,
      showId,
      // slug,
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
        <Button className="text-black" onClick={() => handleClick(true)}>
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
