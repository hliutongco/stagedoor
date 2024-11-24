import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const show = pgTable("show", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});