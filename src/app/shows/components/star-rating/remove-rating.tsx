import { useCallback } from 'react';
import { trpc } from '@/server/clients/client-api';
import { toast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function RemoveRating({
  id,
  rating,
  setRating,
  showId,
  sumRatings,
  totalRatings,
}: {
  id: string | undefined;
  rating: string;
  setRating: (value: string) => void;
  showId: string;
  sumRatings: string | number;
  totalRatings: number;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const removeRatingMutation = trpc.userShows.removeRating.useMutation({
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
      toast({
        description: 'Rating successfully removed',
        variant: 'default',
      });
    },
  });
  const editShowMutation = trpc.shows.editShow.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.shows.invalidate();
      router.refresh();
    },
  });
  const handleClick = useCallback(() => {
    if (id) {
      removeRatingMutation.mutate({ id });
      editShowMutation.mutate({
        id: showId,
        sumRatings: Number(sumRatings) - Number(rating),
        totalRatings: totalRatings - 1,
      });
      setRating('0');
    } else {
      toast({
        description: 'Please refresh the page and try again',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
      return;
    }
  }, [
    id,
    editShowMutation,
    rating,
    removeRatingMutation,
    setRating,
    showId,
    sumRatings,
    totalRatings,
  ]);

  return (
    <span className="text-sm" onClick={handleClick} role="button">
      Remove Rating
    </span>
  );
}
