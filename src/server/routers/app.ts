import { router } from '../init-trpc';
import { createTRPCReact } from '@trpc/react-query';
import { showsRouter } from './show';
import { watchedShowRouter } from './watched-show';
import { ratingsRouter } from './rating';

export const appRouter = router({
  ratings: ratingsRouter,
  shows: showsRouter,
  watchedShows: watchedShowRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
