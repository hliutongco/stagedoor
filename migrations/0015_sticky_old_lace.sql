ALTER TABLE "reviews" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_shows" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_shows" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;