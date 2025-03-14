import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../init-trpc';
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
    return db.query.shows.findMany({
      where: eq(shows.type, 'musical'),
      with: {
        userShows: true,
      },
    });
  }),
  getPlays: publicProcedure.query(() => {
    return db.query.shows.findMany({
      where: eq(shows.type, 'play'),
      with: {
        userShows: true,
      },
    });
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
        with: {
          reviews: {
            with: {
              user: true,
              userShow: true,
            },
          },
          userShows: true,
        },
      });
    }),
  editShow: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        sumRatings: z.string(),
        totalRatings: z.number(),
      }),
    )
    .mutation(({ input: { id, sumRatings, totalRatings } }) => {
      return db
        .update(shows)
        .set({
          sumRatings,
          totalRatings,
        })
        .where(eq(shows.id, id));
    }),
});
// export type definition of router
export type ShowsRouter = typeof showsRouter;
