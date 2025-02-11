'use client';
import { trpc } from '@/server/clients/client-api';
import { useClerk } from '@clerk/nextjs';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useMemo } from 'react';
import {
  Button,
  Spinner,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/index';
import { IsWatchedContext } from '../[slug]/components/isWatchedProvider';

interface WatchedButtonProps {
  hasRatingOrReview: boolean;
  id: string | undefined;
  showId: string;
  userIdentifier: string | undefined;
}

export default function WatchedButton({
  hasRatingOrReview,
  id,
  showId,
  userIdentifier = '',
}: WatchedButtonProps) {
  const { isWatched, setIsWatched } = useContext(IsWatchedContext);
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const createMutation = trpc.userShows.createWithWatchedShow.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.userShows.invalidate();
      router.refresh();
    },
  });
  const deleteMutation = trpc.userShows.deleteEmptyRecord.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.userShows.invalidate();
      router.refresh();
    },
  });
  const handleClick = useCallback(
    (value: boolean) => {
      if (!userIdentifier) {
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
        createMutation.mutate({ showId, userIdentifier });
      } else if (id) {
        deleteMutation.mutate({ id });
      } else {
        toast({
          description: 'Please refresh the page and try again',
          title: 'Uh oh! Something went wrong.',
          variant: 'destructive',
        });
        return;
      }
      setIsWatched(value);
    },
    [
      createMutation,
      deleteMutation,
      hasRatingOrReview,
      id,
      isWatched,
      redirectToSignIn,
      setIsWatched,
      showId,
      toast,
      userIdentifier,
    ],
  );
  const isLoading = useMemo(
    () => createMutation.isPending || deleteMutation.isPending,
    [createMutation, deleteMutation],
  );

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && isWatched && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => handleClick(false)} variant="secondary">
                <Check className="mr-1" size="30" /> I&apos;ve Seen This!
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {!isLoading && !isWatched && (
        <Button className="text-black" onClick={() => handleClick(true)}>
          I&apos;ve Seen This!
        </Button>
      )}
    </>
  );
}
