CREATE TABLE IF NOT EXISTS "ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" numeric DEFAULT '0' NOT NULL,
	"show_id" uuid,
	"user_id" text
);
