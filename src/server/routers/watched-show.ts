import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const watchedShows = schema.watchedShows;

export const watchedShowRouter = router({
  getWatchedShow: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .query(({ input: { showId, userId } }) => {
      return db.query.watchedShows.findFirst({
        where: and(eq(watchedShows.showId, showId), eq(watchedShows.userId, userId)),
      });
    }),
  getWatchedShowsByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input: { userId } }) => {
      return db.select().from(watchedShows).where(eq(watchedShows.userId, userId));
    }),
  getWatchedShowsByShow: publicProcedure
    .input(
      z.object({
        showId: z.string().uuid(),
      }),
    )
    .query(({ input: { showId } }) => {
      return db.select().from(watchedShows).where(eq(watchedShows.showId, showId));
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
