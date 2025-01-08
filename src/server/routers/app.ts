import { router } from '../init-trpc';
import { createTRPCReact } from '@trpc/react-query';
import { showsRouter } from './show';
import { userShowRouter } from './user-show';

export const appRouter = router({
  userShows: userShowRouter,
  shows: showsRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
