CREATE TABLE `sensor_air_data` (
	`id` text NOT NULL,
	`device_id` text NOT NULL,
	`temperature` real NOT NULL,
	`co2` real NOT NULL,
	`humidity` real NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
