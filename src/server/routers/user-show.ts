import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { and, avg, eq } from 'drizzle-orm';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const userShows = schema.userShows;

export const userShowRouter = router({
  createWithWatchedShow: protectedProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input: { showId, userId } }) => {
      return db
        .insert(userShows)
        .values({
          isWatched: true,
          showId,
          userId,
        })
        .returning();
    }),
  createWithRating: protectedProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
        rating: z.string(),
      }),
    )
    .mutation(({ input: { showId, userId, rating } }) => {
      return db.insert(userShows).values({
        isWatched: true,
        showId,
        userId,
        rating,
      });
    }),
  getUserShow: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .query(({ input: { showId, userId } }) => {
      return db.query.userShows.findFirst({
        where: and(eq(userShows.showId, showId), eq(userShows.userId, userId)),
        with: {
          reviews: true,
        },
      });
    }),
  toggleWatchedShow: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        value: z.boolean(),
      }),
    )
    .mutation(({ input: { id, value } }) => {
      return db
        .update(userShows)
        .set({
          isWatched: value,
        })
        .where(eq(userShows.id, id));
    }),
  changeRating: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        rating: z.string(),
      }),
    )
    .mutation(({ input: { id, rating } }) => {
      return db
        .update(userShows)
        .set({
          isWatched: true,
          rating,
        })
        .where(eq(userShows.id, id));
    }),
  removeRating: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(({ input: { id } }) => {
      return db
        .update(userShows)
        .set({
          rating: '0',
        })
        .where(eq(userShows.id, id));
    }),
  deleteEmptyRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(({ input: { id } }) => {
      return db.delete(userShows).where(eq(userShows.id, id));
    }),
  getAverageRating: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
      }),
    )
    .query(({ input: { showId } }) => {
      return db
        .select({ value: avg(schema.userShows.rating) })
        .from(schema.userShows)
        .where(eq(schema.userShows.showId, showId));
    }),
});
