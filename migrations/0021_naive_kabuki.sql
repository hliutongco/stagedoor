ALTER TABLE "reviews" RENAME COLUMN "user_id" TO "user_identifier";--> statement-breakpoint
ALTER TABLE "user_shows" RENAME COLUMN "user_id" TO "user_identifier";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;