import * as trpcNext from '@trpc/server/adapters/next';
import { router } from '../trpc';
import { reviewsRouter } from './review';

export const appRouter = router({
  reviews: reviewsRouter,
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
