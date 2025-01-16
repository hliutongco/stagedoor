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
  // reviews: many(reviews),
  userShows: many(userShows),
}));

export const reviews = pgTable('reviews', {
  id: uuid().primaryKey().defaultRandom(),
  body: text().notNull(),
  title: text().notNull(),
  userShowId: uuid('user_show_id'),
  userId: text('user_id'),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  // show: one(shows, {
  //   fields: [reviews.showId],
  //   references: [shows.id],
  // }),
  userShows: one(userShows, {
    fields: [reviews.userShowId],
    references: [userShows.id],
  }),
}));

export const userShows = pgTable('user_shows', {
  id: uuid().primaryKey().defaultRandom(),
  hasRating: boolean().notNull().default(false),
  hasReview: boolean().notNull().default(false),
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
