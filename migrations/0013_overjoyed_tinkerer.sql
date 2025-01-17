CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"imageUrl" text NOT NULL,
	"lastName" text,
	"username" text
);
--> statement-breakpoint
ALTER TABLE "user_shows" ALTER COLUMN "hasRating" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_shows" drop column "hasRating";--> statement-breakpoint
ALTER TABLE "user_shows" ADD COLUMN "hasRating" boolean GENERATED ALWAYS AS (CASE WHEN rating = '0' THEN false ELSE true END) STORED NOT NULL;