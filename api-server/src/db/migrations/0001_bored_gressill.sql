ALTER TABLE "roles" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_name_unique" UNIQUE("name");