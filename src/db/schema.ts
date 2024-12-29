import { text, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const shows = pgTable('shows', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
});

export const showRelations = relations(shows, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviews = pgTable('reviews', {
  body: text().notNull(),
  id: uuid().primaryKey().defaultRandom(),
  showId: uuid('show_id'),
  userId: uuid('user_id'),
  title: text().notNull(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  show: one(shows, {
    fields: [reviews.showId],
    references: [shows.id],
  }),
}));
