import { text, pgTable, uuid, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const shows = pgTable('shows', {
  id: uuid().primaryKey().defaultRandom(),
  playbillImage: text().notNull().default(''),
  title: text().notNull(),
});

export const showRelations = relations(shows, ({ many }) => ({
  reviews: many(reviews),
  watchedShows: many(watchedShows),
}));

export const reviews = pgTable('reviews', {
  body: text().notNull(),
  id: uuid().primaryKey().defaultRandom(),
  showId: uuid('show_id'),
  userId: text('user_id'),
  title: text().notNull(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  show: one(shows, {
    fields: [reviews.showId],
    references: [shows.id],
  }),
}));

// export const watchedShows = pgTable('watched_shows', {
//   id: uuid().primaryKey().defaultRandom(),
//   showId: uuid('show_id'),
//   userId: text('user_id'),
// });

// export const watchedShowsRelations = relations(watchedShows, ({ one }) => ({
//   show: one(shows, {
//     fields: [watchedShows.showId],
//     references: [shows.id],
//   }),
// }));

// export const ratings = pgTable('ratings', {
//   id: uuid().primaryKey().defaultRandom(),
//   rating: decimal().notNull().default('0'),
//   showId: uuid('show_id'),
//   userId: text('user_id'),
// });
