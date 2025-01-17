import { boolean, decimal, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';

const showTypeEnum = pgEnum('type', ['musical', 'play']);

export const shows = pgTable('shows', {
  id: uuid().primaryKey().defaultRandom(),
  playbillImage: text().notNull().default(''),
  slug: text()
    .notNull()
    .unique()
    .generatedAlwaysAs(sql`lower(regexp_replace(title, ' ', '-', 'g')) || '-' || year`),
  title: text().notNull(),
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
  showId: uuid('show_id'),
  title: text().notNull(),
  userId: text('user_id'),
  userShowId: uuid('user_show_id').notNull(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  show: one(shows, {
    fields: [reviews.showId],
    references: [shows.id],
  }),
  userShow: one(userShows, {
    fields: [reviews.userShowId],
    references: [userShows.id],
  }),
}));

export const users = pgTable('users', {
  id: text().primaryKey(),
  firstName: text(),
  imageUrl: text().notNull(),
  lastName: text(),
  username: text(),
});

export const userShows = pgTable('user_shows', {
  id: uuid().primaryKey().defaultRandom(),
  hasRating: boolean()
    .notNull()
    .generatedAlwaysAs(sql`CASE WHEN rating = '0' THEN false ELSE true END`),
  isWatched: boolean().notNull().default(false),
  rating: decimal().notNull().default('0'),
  showId: uuid('show_id'),
  userId: text('user_id'),
});

export const userShowsRelations = relations(userShows, ({ many, one }) => ({
  reviews: many(reviews),
  show: one(shows, {
    fields: [userShows.showId],
    references: [shows.id],
  }),
}));
