import { text, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const shows = pgTable('shows', {
  id: uuid().primaryKey().defaultRandom(),
  playbillImage: text().notNull().default(''),
  title: text().notNull(),
});

export const showRelations = relations(shows, ({ many }) => ({
  reviews: many(reviews),
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

export const watchedShow = pgTable('watched_show', {
  id: uuid().primaryKey().defaultRandom(),
  showId: uuid('show_id'),
  userId: text('user_id'),
});

export const watchedShowRelations = relations(watchedShow, ({ one }) => ({
  show: one(shows, {
    fields: [watchedShow.showId],
    references: [shows.id],
  }),
}));
