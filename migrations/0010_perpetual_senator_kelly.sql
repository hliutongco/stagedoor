ALTER TABLE "shows" ADD COLUMN "slug" text GENERATED ALWAYS AS (concat(lower(regexp_replace(title, 's', '-', 'g')), '-', year)) STORED NOT NULL;--> statement-breakpoint
ALTER TABLE "shows" ADD COLUMN "year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_title_unique" UNIQUE("title");