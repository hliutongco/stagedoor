ALTER TABLE "user_shows" RENAME COLUMN "hasReviewOrRating" TO "hasRating";--> statement-breakpoint
ALTER TABLE "user_shows" ADD COLUMN "hasReview" boolean DEFAULT false NOT NULL;