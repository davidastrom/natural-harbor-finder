ALTER TABLE "users" ALTER COLUMN "auth0_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth0_id_unique" UNIQUE("auth0_id");