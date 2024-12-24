'use server';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { shows } from '../../db/schema';

const sql = neon(process.env.DATABASE_URL ?? '');
const db = drizzle(sql);

export const showsRouter = router({
  getShows: protectedProcedure.query(() => {
    return db.select().from(shows);
  }),
  getShow: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input: { id } }) => {
      return db.select().from(shows).where(eq(shows.id, id));
    }),
});
// export type definition of router
export type ShowsRouter = typeof showsRouter;
