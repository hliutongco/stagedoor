'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Spinner,
  Textarea,
} from '@/components/ui/';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { trpc } from '@/server/clients/client-api';
import { useCallback, useContext, useState } from 'react';
import { toast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { IsWatchedContext } from './isWatchedProvider';
import { useClerk } from '@clerk/nextjs';

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

export default function ReviewModal({
  showId,
  userId,
  userShowId,
}: {
  showId: string;
  userId: string;
  userShowId: string | undefined;
}) {
  const router = useRouter();
  const { redirectToSignIn } = useClerk();
  const { setIsWatched } = useContext(IsWatchedContext);
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
      title: '',
    },
  });
  const { control, handleSubmit, reset } = form;
  const createUserShowMutation = trpc.userShows.createWithWatchedShow.useMutation({
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
  const createMutation = trpc.reviews.createReview.useMutation({
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
        description: 'Your review was successfully submitted.',
        title: 'Success!',
        variant: 'default',
      });
    },
  });
  const [open, toggleOpen] = useState(false);
  const handleOpen = useCallback(
    (value: boolean) => {
      if (!userId) {
        redirectToSignIn();
        return;
      }
      toggleOpen(value);
      reset();
    },
    [redirectToSignIn, reset, toggleOpen, userId],
  );
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { body, title } = data;
    if (userShowId) {
      createMutation.mutate({ body, showId, title, userId, userShowId });
    } else {
      const [{ id }] = await createUserShowMutation.mutateAsync({ showId, userId });
      setIsWatched(true);
      createMutation.mutate({ body, showId, title, userId, userShowId: id });
    }
    handleOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Write Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Fill in the fields below to add your review
          </DialogDescription>
        </DialogHeader>
        {(createMutation.isPending || createUserShowMutation.isPending) && (
          <Spinner className="my-24" />
        )}
        {!createMutation.isPending && !createUserShowMutation.isPending && (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="flex gap-2 justify-end mt-4">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="default">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
