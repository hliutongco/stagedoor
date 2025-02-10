'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Spinner,
  Textarea,
} from '@/components/ui/';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { trpc } from '@/server/clients/client-api';
import { toast } from '@/components/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'The description must be at least 10 characters',
    })
    .max(200, {
      message: 'The max length is 200 characters',
    }),
});

export default function Description({
  description,
  userId,
}: {
  description: string;
  userId: string | null | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description,
    },
  });
  const { control, handleSubmit, reset } = form;
  const mutation = trpc.users.editDescription.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.users.getUser.invalidate();
      startTransition(() => {
        router.refresh();
      });
      toast({
        description: 'Your description was successfully submitted.',
        title: 'Success!',
        variant: 'default',
      });
    },
  });
  const isLoading = useMemo(() => {
    return mutation.isPending || isPending;
  }, [isPending, mutation.isPending]);
  const handleCancel = useCallback(() => {
    setIsEditing(false);
    reset();
  }, [reset, setIsEditing]);
  const onSubmit: SubmitHandler<{ description: string }> = useCallback(
    ({ description }) => {
      if (!userId) throw new Error('User ID is required');
      mutation.mutate({ description, clerkId: userId });
      setIsEditing(false);
    },
    [mutation, setIsEditing, userId],
  );
  return (
    <>
      {isLoading && (
        <div className="my-4 mx-auto pb-6 relative max-w-fit w-3/4 lg:w-1/2">
          <p className="pt-4 text-center">
            <Spinner size="small" />
          </p>
        </div>
      )}
      {isEditing && (
        <div className="mx-auto w-3/4 md:w-1/2 xl:w-1/3">
          <Form {...form}>
            <form className="pb-14 relative" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="description"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="text-base" htmlFor="description">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} id="description" />
                    </FormControl>
                    {formState.errors.description && (
                      <FormMessage className="text-sm">
                        {formState.errors.description.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <div className="absolute bottom-4 flex gap-2 mt-2 right-0">
                <Button onClick={handleCancel} size="sm" type="button" variant="default">
                  Cancel
                </Button>
                <Button size="sm" type="submit" variant="default">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      {!isLoading && !isEditing && Boolean(description?.length) && (
        <div className="mx-auto my-4 pb-6 relative max-w-fit w-3/4 lg:w-1/2">
          <p className="font-medium mb-1">Description</p>
          <p className="mb-4">{description}</p>
          <div className="absolute bottom-0 mt-2 right-0">
            <Button onClick={() => setIsEditing(true)} size="sm" variant="default">
              Edit
            </Button>
          </div>
        </div>
      )}
      {!isLoading && !isEditing && !description?.length && (
        <div className="my-4 mx-auto pb-6 relative max-w-fit w-3/4 lg:w-1/2">
          <p className="font-medium mb-1">Description</p>
          <p className="italic mb-4 text-center text-muted">
            Click Edit to add a description
          </p>
          <div className="absolute bottom-0 mt-2 right-0">
            <Button onClick={() => setIsEditing(true)} size="sm" variant="default">
              Edit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
