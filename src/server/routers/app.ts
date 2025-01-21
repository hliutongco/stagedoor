import { router } from '../init-trpc';
import { createTRPCReact } from '@trpc/react-query';
import { showsRouter } from './show';
import { userShowRouter } from './user-show';
import { reviewRouter } from './review';
import { userRouter } from './user';

export const appRouter = router({
  reviews: reviewRouter,
  shows: showsRouter,
  users: userRouter,
  userShows: userShowRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
