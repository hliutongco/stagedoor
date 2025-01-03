CREATE TABLE IF NOT EXISTS "watched_show" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"show_id" uuid,
	"user_id" uuid
);
