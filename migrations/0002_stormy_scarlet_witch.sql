ALTER TABLE "review" RENAME TO "reviews";--> statement-breakpoint
ALTER TABLE "show" RENAME TO "shows";--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "show_i" integer;