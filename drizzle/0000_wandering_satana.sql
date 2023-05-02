CREATE TABLE `teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`avatar` text
);

CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`avatar` text,
	`name` text
);

CREATE TABLE `usersToTeams` (
	`userId` integer NOT NULL,
	`teamId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`)
);

CREATE UNIQUE INDEX `emailIdx` ON `users` (`email`);