import { integer, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const shows = pgTable('shows', {
  id: integer().primaryKey(),
  title: text().notNull(),
});

export const showRelations = relations(shows, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviews = pgTable('reviews', {
  body: text().notNull(),
  id: integer().primaryKey(),
  showId: integer('show_id'),
  userId: integer('user_id'),
  title: text().notNull(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  show: one(shows, {
    fields: [reviews.showId],
    references: [shows.id],
  }),
}));
