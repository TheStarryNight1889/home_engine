CREATE TABLE `devices` (
	`id` text NOT NULL,
	`location_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`version` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `sensor_air_data` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `sensor_air_data` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP);