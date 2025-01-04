import { publicProcedure, protectedProcedure, router } from '../init-trpc';
import { watchedShows } from '@/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const watchedShowRouter = router({
  getWatchedShow: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .query(({ input: { showId, userId } }) => {
      return db
        .select()
        .from(watchedShows)
        .where(and(eq(watchedShows.showId, showId), eq(watchedShows.userId, userId)));
    }),
  addWatchedShow: protectedProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { showId, userId } }) => {
      return db.insert(watchedShows).values({
        showId,
        userId,
      });
    }),
  removeWatchedShow: protectedProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { showId, userId } }) => {
      return db
        .delete(watchedShows)
        .where(and(eq(watchedShows.showId, showId), eq(watchedShows.userId, userId)));
    }),
});
