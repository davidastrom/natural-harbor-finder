DO $$ BEGIN
 CREATE TYPE "permission" AS ENUM('read:harbors', 'edit:harbors');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_permissions" (
	"role_id" integer NOT NULL,
	"permission" "permission" NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_pk" PRIMARY KEY("role_id","permission")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book_refs" (
	"book_id" integer NOT NULL,
	"page" integer,
	"harbor_id" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "harbor_detail_shielded_directions" (
	"harbor_detail_id" integer NOT NULL,
	"direction" integer NOT NULL,
	CONSTRAINT "harbor_detail_shielded_directions_harbor_detail_id_direction_pk" PRIMARY KEY("harbor_detail_id","direction")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "harbor_details" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"harbor_id" integer NOT NULL,
	"anchor" boolean DEFAULT false NOT NULL,
	"sxk_buoy" boolean DEFAULT false NOT NULL,
	"latitude" numeric,
	"longitude" numeric,
	"harbor_type" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "harbors" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"chart_number" integer NOT NULL,
	"harbor_type" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "user_roles_role_id_user_id_pk" PRIMARY KEY("role_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"auth0_id" text,
	"profile_picture" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_refs" ADD CONSTRAINT "book_refs_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_refs" ADD CONSTRAINT "book_refs_harbor_id_harbors_id_fk" FOREIGN KEY ("harbor_id") REFERENCES "harbors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "harbor_detail_shielded_directions" ADD CONSTRAINT "harbor_detail_shielded_directions_harbor_detail_id_harbor_details_id_fk" FOREIGN KEY ("harbor_detail_id") REFERENCES "harbor_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "harbor_details" ADD CONSTRAINT "harbor_details_harbor_id_harbors_id_fk" FOREIGN KEY ("harbor_id") REFERENCES "harbors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
