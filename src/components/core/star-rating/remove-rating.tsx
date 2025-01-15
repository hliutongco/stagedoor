import { useCallback } from 'react';
import { trpc } from '@/server/clients/client-api';
import { toast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function RemoveRating({
  id,
  setRating,
}: {
  id: string | undefined;
  setRating: (value: string) => void;
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
  const handleClick = useCallback(() => {
    if (id) {
      removeRatingMutation.mutate({ id });
      setRating('0');
    } else {
      toast({
        description: 'Please refresh the page and try again',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
      return;
    }
  }, [id, removeRatingMutation, setRating]);

  return (
    <span className="text-sm" onClick={handleClick} role="button">
      Remove Rating
    </span>
  );
}
