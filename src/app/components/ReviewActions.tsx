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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
  Textarea,
} from '@/components/ui';
import { toast } from '@/components/ui/hooks/use-toast';
import { reviews } from '@/db/schema';
import { trpc } from '@/server/clients/client-api';
import { Pencil, Trash2 } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IsLoadingContext } from './IsLoadingProvider';

const formSchema = z.object({
  body: z
    .string()
    .min(10, {
      message: 'The review must be at least 10 characters',
    })
    .max(20000, {
      message: 'The max length is 20,000 characters',
    }),
  title: z
    .string()
    .nonempty({
      message: 'The title must be at least 1 character',
    })
    .max(200, {
      message: 'The max length is 200 characters',
    }),
});

export default function ReviewActions({
  review,
}: {
  review: typeof reviews.$inferSelect;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return review;
    }, [review]),
  });
  const { control, handleSubmit, reset } = form;
  const [isPending, startTransition] = useTransition();

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
  const editMutation = trpc.reviews.editReview.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.reviews.invalidate();
      startTransition(() => {
        router.refresh();
      });
      toast({
        description: 'Your review was successfully saved.',
        title: 'Success!',
        variant: 'default',
      });
    },
  });

  const { setIsLoading } = useContext(IsLoadingContext);
  useEffect(() => {
    setIsLoading(editMutation.isPending || isPending);
  }, [editMutation.isPending, isPending, setIsLoading]);

  const handleDeleteClick = useCallback(() => {
    deleteMutation.mutate({ id: review.id });
  }, [deleteMutation, review]);
  const handleEditClick = useCallback(
    (data: z.infer<typeof formSchema>) => {
      editMutation.mutate({ body: data.body, id: review.id, title: data.title });
    },
    [editMutation, review],
  );

  return (
    <div aria-label="Edit or Delete Review" className="flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label="Edit Review" size="sm" variant="ghost">
            <Pencil aria-hidden />
          </Button>
        </DialogTrigger>
        <DialogContent handleCancel={() => reset(review)}>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          {editMutation.isPending && <Spinner className="my-24" />}
          {!editMutation.isPending && (
            <Form {...form}>
              <form onSubmit={handleSubmit(handleEditClick)}>
                <FormField
                  control={control}
                  name="title"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel htmlFor="review-title">Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="review-title"
                          placeholder="Title"
                          type="text"
                        />
                      </FormControl>
                      {formState.errors.title && (
                        <FormMessage className="text-sm">
                          {formState.errors.title.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="body"
                  render={({ field, formState }) => (
                    <FormItem className="mt-4">
                      <FormLabel htmlFor="review-body">Review</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="review-body"
                          placeholder="Write your review"
                        />
                      </FormControl>
                      {formState.errors.body && (
                        <FormMessage className="text-sm">
                          {formState.errors.body.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <DialogFooter className="flex justify-between mt-4">
                  <DialogClose asChild onClick={() => reset(review)}>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" variant="default">
                      Submit
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label="Delete Review" size="sm" variant="ghost">
            <Trash2 aria-hidden />
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
    </div>
  );
}
