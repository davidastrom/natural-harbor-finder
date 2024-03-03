DROP TABLE "role_permissions";--> statement-breakpoint
DROP TABLE "harbor_detail_shielded_directions";--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "permission" permission[];--> statement-breakpoint
ALTER TABLE "harbor_details" ADD COLUMN "shielded_directions" integer[];