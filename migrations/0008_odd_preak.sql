CREATE TABLE IF NOT EXISTS "user_shows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hasReviewOrRating" boolean DEFAULT false NOT NULL,
	"isWatched" boolean DEFAULT false NOT NULL,
	"rating" numeric DEFAULT '0' NOT NULL,
	"show_id" uuid,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "user_id" SET DATA TYPE text;