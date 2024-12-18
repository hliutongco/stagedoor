import { initTRPC } from '@trpc/server';
// Avoid exporting the entire trpc-object since it's not very descriptive.
const trpc = initTRPC.create();
// Base router and procedure helpers
export const router = trpc.router;
export const procedure = trpc.procedure;
