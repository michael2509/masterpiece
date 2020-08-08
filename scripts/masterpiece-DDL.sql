-- -----------------------------------------------------
-- Recreate Schema masterpiece
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `masterpiece`;
CREATE SCHEMA IF NOT EXISTS `masterpiece`;
USE `masterpiece`;

-- -----------------------------------------------------
-- Create table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_username_UQ` (`username`));

-- -----------------------------------------------------
-- Create table `meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meetings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(255) NOT NULL,
  `end_date_time` DATETIME(6) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `start_date_time` DATETIME(6) NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `meetings_code_IDX` (`code`),
  INDEX `meetings_user_id_IDX` (`user_id`),
  CONSTRAINT `meetings_users_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `masterpiece`.`users` (`id`));