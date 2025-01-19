'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { toast } from '@/components/ui/hooks/use-toast';
import { reviews } from '@/db/schema';
import { trpc } from '@/server/clients/client-api';
import { Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewCard({ review }: { review: typeof reviews.$inferSelect }) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.reviews.deleteReview.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.reviews.invalidate();
      router.refresh();
      toast({
        description: 'Your review was successfully deleted.',
        variant: 'default',
      });
    },
  });

  const handleDeleteClick = useCallback(() => {
    deleteMutation.mutate({ id: review.id });
  }, [deleteMutation, review]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review?</p>
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleDeleteClick} variant="destructive">
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
