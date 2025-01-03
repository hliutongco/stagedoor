import { currentUser } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';

// Avoid exporting the entire trpc-object since it's not very descriptive.
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const user = await currentUser();
  return { userId: user?.id };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const trpc = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  // `ctx.user` is nullable
  if (!ctx.userId) {
    //     ^?
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      userId: ctx.userId,
      // ^?
    },
  });
});
export const createCallerFactory = trpc.createCallerFactory;
