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
  getReviewsByShow: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        showId: z.string().uuid(),
      }),
    )
    .query(({ input: { id, showId } }) => {
      if (id) {
        return db
          .select()
          .from(reviews)
          .where(and(eq(reviews.showId, showId), not(eq(reviews.id, id))));
      }
      return db.select().from(reviews).where(eq(reviews.showId, showId));
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
  getReview: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(({ input: { id } }) => {
      return db.query.reviews.findFirst({
        where: eq(reviews.id, id),
      });
    }),
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
// export type definition of router
export type ReviewRouter = typeof reviewRouter;
