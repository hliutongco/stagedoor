import { router } from '../init-trpc';
import { createTRPCReact } from '@trpc/react-query';
import { showsRouter } from './show';
import { userShowRouter } from './user-show';
import { reviewRouter } from './review';

export const appRouter = router({
  userShows: userShowRouter,
  reviews: reviewRouter,
  shows: showsRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
