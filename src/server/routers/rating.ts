import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const ratings = schema.ratings;

export const ratingsRouter = router({
  getRatingsByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input: { userId } }) => {
      return db.select().from(ratings).where(eq(ratings.userId, userId));
    }),
  getRating: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .query(({ input: { showId, userId } }) => {
      return db.query.ratings.findFirst({
        where: and(eq(ratings.userId, userId), eq(ratings.showId, showId)),
      });
    }),
  addRating: protectedProcedure
    .input(
      z.object({
        rating: z.string(),
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { showId, userId, rating } }) => {
      return db.insert(ratings).values({
        showId,
        userId,
        rating,
      });
    }),
  updateRating: protectedProcedure
    .input(
      z.object({
        rating: z.string(),
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { rating, showId, userId } }) => {
      return db
        .update(ratings)
        .set({ rating })
        .where(and(eq(ratings.userId, userId), eq(ratings.showId, showId)));
    }),
});
