ALTER TABLE "reviews" ADD COLUMN "user_show_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "user_shows" DROP COLUMN IF EXISTS "hasReview";