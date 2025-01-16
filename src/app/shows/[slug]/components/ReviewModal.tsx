'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
} from '@/components/ui/';
import { useForm } from 'react-hook-form';
// import { trpc } from '@/server/clients/client-api';

type FormData = { body: Text; title: Text };

export default function ReviewModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  // const createMutation = trpc.reviews.createReview.useMutation({ title });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-outline" variant="outline">
          Write Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Fill in the fields below to add your review
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="review-title">Title</Label>
          <Input
            {...register('title', {
              maxLength: {
                message: 'The max length is 200 characters',
                value: 200,
              },
              required: 'The title is required',
            })}
            className={errors.title ? 'border-destructive' : ''}
            id="review-title"
            type="text"
          />
          {errors.title && (
            <p className="mb-4 text-destructive text-sm">{errors.title.message}</p>
          )}
          <Label htmlFor="review-body">Review</Label>
          <Textarea
            {...register('body', {
              minLength: {
                message: 'The review must be at least 10 characters',
                value: 10,
              },
              required: 'The review cannot be empty',
            })}
            className={errors.body ? 'border-destructive' : ''}
            id="review-body"
          />
          {errors.body && (
            <p className="mb-4 text-destructive text-sm">{errors.body.message}</p>
          )}
          <div className="flex justify-end">
            <Button
              className="mt-4 text-black"
              onClick={handleSubmit(onSubmit)}
              variant="default"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
