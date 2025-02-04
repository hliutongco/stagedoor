import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const reviews = schema.reviews;

export const reviewRouter = router({
  getReviews: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(({ input: { limit } }) => {
      return db.query.reviews.findMany({
        limit: limit ?? -1,
        orderBy: desc(reviews.createdAt),
        with: {
          show: true,
          user: true,
          userShow: true,
        },
      });
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
        with: {
          show: true,
          user: true,
          userShow: true,
        },
      });
    }),
  createReview: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        showId: z.string().uuid(),
        title: z.string(),
        userId: z.string(),
        userShowId: z.string(),
      }),
    )
    .mutation(({ input: { body, showId, title, userId, userShowId } }) => {
      return db.insert(reviews).values({
        body,
        showId,
        title,
        userId,
        userShowId,
      });
    }),
  editReview: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        id: z.string().uuid(),
        title: z.string(),
      }),
    )
    .mutation(({ input: { body, id, title } }) => {
      return db.update(reviews).set({ body, title }).where(eq(reviews.id, id));
    }),
  deleteReview: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(({ input: { id } }) => {
      return db.delete(reviews).where(eq(reviews.id, id));
    }),
});
// export type definition of router
export type ReviewRouter = typeof reviewRouter;
