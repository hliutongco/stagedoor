import { router } from '../init-trpc';
import { showsRouter } from './show';
import { createTRPCReact } from '@trpc/react-query';
import { watchedShowRouter } from './watched-show';

export const appRouter = router({
  shows: showsRouter,
  watchedShows: watchedShowRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
