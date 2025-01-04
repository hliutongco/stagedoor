import { z } from 'zod';
import { publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, inArray } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { shows } from '../../db/schema';
import * as schema from '../../db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export const showsRouter = router({
  getShows: publicProcedure.query(() => {
    return db.select().from(shows);
  }),
  getShowsById: publicProcedure
    .input(
      z.object({
        ids: z.string().array(),
      }),
    )
    .query(({ input: { ids } }) => {
      return db.select().from(shows).where(inArray(shows.id, ids));
    }),
  getShow: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(({ input: { id } }) => {
      return db.select().from(shows).where(eq(shows.id, id));
    }),
});
// export type definition of router
export type ShowsRouter = typeof showsRouter;
