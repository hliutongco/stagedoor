import { z } from 'zod';
import { procedure, router } from '../trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { reviews } from '../../db/schema';

const sql = neon(process.env.DATABASE_URL ?? '');
const db = drizzle(sql);

export const reviewsRouter = router({
  getReview: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input: { id } }) => {
      return db.select().from(reviews).where(eq(reviews.id, id));
    }),
});
// export type definition of router
export type ReviewsRouter = typeof reviewsRouter;
