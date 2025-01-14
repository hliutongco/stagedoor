'use client';
import { Button } from '@/components/ui/button';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Spinner } from '@/components/ui/spinner';

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
  userId = '',
}: WatchedButtonProps) {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const getUserShow = trpc.userShows.getUserShow.useQuery({ showId, userId });
  const createMutation = trpc.userShows.createWithWatchedShow.useMutation({
    onSuccess: async () => {
      await utils.userShows.invalidate();
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
      utils.userShows.invalidate();
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
          variant: 'default',
          description:
            'This show cannot be marked as not watched because of a rating or review',
        });
        return;
      }
      if (!isWatched && !hasRatingOrReview) {
        createMutation.mutate({ showId, userId });
      } else if (id) {
        deleteMutation.mutate({ id });
      } else {
        const _id = getUserShow.data?.id;
        if (_id) {
          deleteMutation.mutate({ id: _id });
        } else {
          toast({
            description: 'Please refresh the page and try again',
            title: 'Uh oh! Something went wrong.',
            variant: 'destructive',
          });
          return;
        }
      }
      setIsWatched(value);
      router.refresh();
    },
    [
      createMutation,
      deleteMutation,
      getUserShow,
      hasRatingOrReview,
      id,
      isWatched,
      redirectToSignIn,
      router,
      setIsWatched,
      showId,
      toast,
      userId,
    ],
  );
  const isLoading = useMemo(
    () => createMutation.isPending || deleteMutation.isPending || getUserShow.isPending,
    [createMutation, deleteMutation, getUserShow],
  );

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && isWatched && (
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
      {!isLoading && !isWatched && (
        <Button className="text-black" onClick={() => handleClick(true)}>
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
