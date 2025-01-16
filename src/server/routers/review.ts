import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq, inArray, not } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const reviews = schema.reviews;

export const reviewRouter = router({
  getReviews: publicProcedure.query(() => {
    return db.select().from(reviews);
  }),
  getReviewsById: publicProcedure
    .input(
      z.object({
        ids: z.string().array(),
      }),
    )
    .query(({ input: { ids } }) => {
      return db.select().from(reviews).where(inArray(reviews.id, ids));
    }),
  getReviewsByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input: { userId } }) => {
      return db.select().from(reviews).where(eq(reviews.userId, userId));
    }),
  // TODO: create validation for max 10 reviews per UserShow
  createReview: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        showId: z.string().uuid(),
        title: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(({ input: { body, showId, title, userId } }) => {
      return db.insert(reviews).values({
        body,
        showId,
        title,
        userId,
      });
    }),
});

export type ReviewRouter = typeof reviewRouter;
