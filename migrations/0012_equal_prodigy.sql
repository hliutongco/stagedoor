CREATE TYPE type AS ENUM ('musical', 'play');

ALTER TABLE "shows" ADD COLUMN "type" type DEFAULT 'musical';