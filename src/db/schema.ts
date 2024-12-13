import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const show = pgTable("show", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export const review = pgTable("review", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
});