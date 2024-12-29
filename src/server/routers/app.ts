import { router } from '../init-trpc';
import { showsRouter } from './show';
import { createTRPCReact } from '@trpc/react-query';

export const appRouter = router({
  shows: showsRouter,
});

export type AppRouter = typeof appRouter;

export const trpc = createTRPCReact<AppRouter>();
