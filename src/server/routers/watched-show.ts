import { publicProcedure, protectedProcedure, router } from '../init-trpc';
import { watchedShow } from '@/db/schema';
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
        .from(watchedShow)
        .where(and(eq(watchedShow.showId, showId), eq(watchedShow.userId, userId)));
    }),
  addWatchedShow: protectedProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { showId, userId } }) => {
      return db.insert(watchedShow).values({
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
        .delete(watchedShow)
        .where(and(eq(watchedShow.showId, showId), eq(watchedShow.userId, userId)));
    }),
});
