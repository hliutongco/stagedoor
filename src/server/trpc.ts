import { currentUser } from '@clerk/nextjs/server';
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
// Avoid exporting the entire trpc-object since it's not very descriptive.
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const user = await currentUser();
  return { userId: user?.id };
});
const trpc = initTRPC.create();
// Base router and procedure helpers
export const router = trpc.router;
export const createCallerFactory = trpc.createCallerFactory;
export const procedure = trpc.procedure;
