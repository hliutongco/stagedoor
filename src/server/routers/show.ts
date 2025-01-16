import { z } from 'zod';
import { publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, inArray } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const shows = schema.shows;

export const showsRouter = router({
  getShows: publicProcedure.query(() => {
    return db.select().from(shows);
  }),
  getMusicals: publicProcedure.query(() => {
    return db.select().from(shows).where(eq(shows.type, 'musical'));
  }),
  getPlays: publicProcedure.query(() => {
    return db.select().from(shows).where(eq(shows.type, 'play'));
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
        slug: z.string(),
      }),
    )
    .query(({ input: { slug } }) => {
      return db.query.shows.findFirst({
        where: eq(shows.slug, slug),
      });
    }),
});
// export type definition of router
export type ShowsRouter = typeof showsRouter;
