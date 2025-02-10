import {
  boolean,
  decimal,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';

const showTypeEnum = pgEnum('type', ['musical', 'play']);

export const shows = pgTable('shows', {
  id: uuid().primaryKey().defaultRandom(),
  averageRating: numeric({ scale: 2 }).generatedAlwaysAs(
    sql`CASE WHEN "totalRatings" = 0 THEN 0 ELSE "sumRatings"::float / "totalRatings" END`,
  ),
  playbillImage: text().notNull().default(''),
  slug: text()
    .notNull()
    .unique()
    .generatedAlwaysAs(sql`lower(regexp_replace(title, ' ', '-', 'g')) || '-' || year`),
  title: text().notNull(),
  sumRatings: numeric({ scale: 2 }).notNull().default('0'),
  totalRatings: integer().notNull().default(0),
  type: showTypeEnum().default('musical'),
  year: text().notNull().default(`${new Date().getFullYear()}`),
});

export const showRelations = relations(shows, ({ many }) => ({
  reviews: many(reviews),
  userShows: many(userShows),
}));

export const reviews = pgTable('reviews', {
  id: uuid().primaryKey().defaultRandom(),
  body: text().notNull(),
  createdAt: timestamp().defaultNow(),
  showId: uuid('show_id'),
  title: text().notNull(),
  userId: text('user_id'),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  userShowId: uuid('user_show_id').notNull(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  show: one(shows, {
    fields: [reviews.showId],
    references: [shows.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.clerkId],
  }),
  userShow: one(userShows, {
    fields: [reviews.userShowId],
    references: [userShows.id],
  }),
}));

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: text(),
  description: text(),
  firstName: text(),
  imageUrl: text().notNull(),
  lastName: text(),
  username: text(),
});

export const userRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  userShows: many(userShows),
}));

export const userShows = pgTable('user_shows', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp().defaultNow(),
  hasRating: boolean()
    .notNull()
    .generatedAlwaysAs(sql`CASE WHEN rating = '0' THEN false ELSE true END`),
  isWatched: boolean().notNull().default(false),
  rating: decimal().notNull().default('0'),
  showId: uuid('show_id'),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  userId: text('user_id'),
});

export const userShowsRelations = relations(userShows, ({ many, one }) => ({
  reviews: many(reviews),
  show: one(shows, {
    fields: [userShows.showId],
    references: [shows.id],
  }),
  user: one(users, {
    fields: [userShows.userId],
    references: [users.clerkId],
  }),
}));
