import { router } from '../trpc';
import { reviewsRouter } from './review';
import { createTRPCReact } from '@trpc/react-query';

export const appRouter = router({
  reviews: reviewsRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
