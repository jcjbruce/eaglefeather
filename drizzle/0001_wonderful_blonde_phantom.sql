CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`name` varchar(128) NOT NULL,
	`description` text,
	`color` varchar(32) NOT NULL,
	`icon` varchar(64) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `link_reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` int NOT NULL,
	`reporterEmail` varchar(320),
	`comment` text,
	`status` enum('pending','reviewed','resolved') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `link_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`organization` varchar(256),
	`description` text NOT NULL,
	`url` varchar(512),
	`phone` varchar(64),
	`email` varchar(320),
	`categoryId` int NOT NULL,
	`provinces` text NOT NULL DEFAULT ('["National"]'),
	`whoItServes` text,
	`isCrisisLine` boolean NOT NULL DEFAULT false,
	`isPublished` boolean NOT NULL DEFAULT false,
	`lastVerified` timestamp,
	`lastChecked` timestamp,
	`linkStatus` enum('ok','broken','unchecked','phone_only') NOT NULL DEFAULT 'unchecked',
	`httpStatus` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceName` varchar(256) NOT NULL,
	`url` varchar(512),
	`phone` varchar(64),
	`categorySlug` varchar(64),
	`province` varchar(64),
	`whoItServes` text,
	`description` text,
	`contactName` varchar(128),
	`contactEmail` varchar(320),
	`comment` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
