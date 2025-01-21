import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const users = schema.users;

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string().nullable(),
        id: z.string(),
        imageUrl: z.string(),
        lastName: z.string().nullable(),
        username: z.string().nullable(),
      }),
    )
    .mutation(({ input: { firstName, id, imageUrl, lastName, username } }) => {
      return db.insert(users).values({
        firstName,
        id,
        imageUrl,
        lastName,
        username,
      });
    }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input: { id } }) => {
      return db.delete(users).where(eq(users.id, id));
    }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input: { id } }) => {
      return db.query.users.findFirst({
        where: eq(users.id, id),
      });
    }),
});
// export type definition of router
export type UserRouter = typeof userRouter;
