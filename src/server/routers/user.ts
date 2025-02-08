import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../init-trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const users = schema.users;
// const userShows = schema.userShows;

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
  editUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ input: { description, id } }) => {
      return db.update(users).set({ description }).where(eq(users.id, id));
    }),
  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input: { id } }) => {
      return db.delete(users).where(eq(users.id, id));
    }),
  getUser: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        username: z.string(),
      }),
    )
    .query(({ input: { limit, username } }) => {
      return db.query.users.findFirst({
        where: eq(users.username, username),
        with: {
          reviews: {
            orderBy: (reviews) => desc(reviews.updatedAt),
            with: {
              show: true,
              userShow: true,
            },
          },
          userShows: {
            limit: limit ?? -1,
            orderBy: (userShows) => desc(userShows.updatedAt),
            with: {
              show: true,
            },
          },
        },
        extras: {
          // TODO: check if drizzle fixed this bug: https://github.com/drizzle-team/drizzle-orm/issues/3564
          // if so, comment this back in:
          // reviewsCount: db
          //   .$count(userShows, eq(userShows.userId, users.id))
          //   .as('reviewsCount'),
        },
      });
    }),
});
// export type definition of router
export type UserRouter = typeof userRouter;
