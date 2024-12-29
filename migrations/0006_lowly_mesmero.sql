ALTER TABLE "reviews" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "show_id" uuid;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "shows" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;