'use client';

import { useCallback, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  userId: string | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const utils = trpc.useUtils();
  const mutation = trpc.users.editUser.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.users.getUser.invalidate();
      router.refresh();
      toast({
        description: 'Your review was successfully submitted.',
        title: 'Success!',
        variant: 'default',
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description,
    },
  });
  const { control, handleSubmit } = form;
  const onSubmit: SubmitHandler<{ description: string }> = useCallback(
    ({ description }) => {
      if (!userId) throw new Error('User ID is required');
      mutation.mutate({ description, id: userId });
      setIsEditing(false);
    },
    [mutation, setIsEditing, userId],
  );
  return (
    <>
      {isEditing && (
        <div className="mx-auto w-1/2">
          <Form {...form}>
            <form className="pb-14 relative" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="description"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base" htmlFor="description">
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
              <Button
                className="absolute bottom-4 mt-2 right-0"
                size="sm"
                type="submit"
                variant="default"
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      )}
      {!isEditing && Boolean(description?.length) && (
        <p className="mx-auto my-4 w-1/2">
          <span className="mb-4">{description}</span>
          <div>
            <Button onClick={() => setIsEditing(true)} size="sm" variant="default">
              Edit
            </Button>
          </div>
        </p>
      )}
      {!isEditing && !description?.length && (
        <p className="flex flex-col items-center my-4 w-full">
          <span className="italic mb-1 text-muted">Click Edit to add a description</span>
          <Button onClick={() => setIsEditing(true)} size="sm" variant="default">
            Edit
          </Button>
        </p>
      )}
    </>
  );
}
