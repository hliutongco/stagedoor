ALTER TABLE "users" DROP CONSTRAINT users_pkey;
ALTER TABLE "users" RENAME COLUMN "id" TO "clerkId";