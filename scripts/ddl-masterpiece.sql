-- -----------------------------------------------------
-- Schema masterpiece
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `masterpiece`;
CREATE SCHEMA IF NOT EXISTS `masterpiece`;
USE `masterpiece` ;

-- -----------------------------------------------------
-- Table `masterpiece`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_username_UQ` (`username`));


-- -----------------------------------------------------
-- Table `masterpiece`.`speakers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`speakers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username_password` VARCHAR(335) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `speakers_user_id_UQ` (`user_id`),
  UNIQUE INDEX `username_password_UQ` (`username_password`),
  CONSTRAINT `speakers_users_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `masterpiece`.`users` (`id`));


-- -----------------------------------------------------
-- Table `masterpiece`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`rooms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(10) NOT NULL,
  `creation_date` DATETIME(6) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `speaker_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rooms_code_UQ` (`code`),
  INDEX `rooms_speaker_id_IDX` (`speaker_id`),
  CONSTRAINT `rooms_speakers_FK`
    FOREIGN KEY (`speaker_id`)
    REFERENCES `masterpiece`.`speakers` (`id`));


-- -----------------------------------------------------
-- Table `masterpiece`.`guests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`guests` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username_code` VARCHAR(90) NOT NULL,
  `room_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `guests_user_id_room_id_UQ` (`user_id`, `room_id`),
  INDEX `guests_room_id_IDX` (`room_id`),
  INDEX `guests_user_id_IDX` (`user_id`),
  UNIQUE INDEX `username_code_UQ` (`username_code`),
  CONSTRAINT `guests_rooms_FK`
    FOREIGN KEY (`room_id`)
    REFERENCES `masterpiece`.`rooms` (`id`),
  CONSTRAINT `guests_users_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `masterpiece`.`users` (`id`));


-- -----------------------------------------------------
-- Table `masterpiece`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`messages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username_code_message_send_date` VARCHAR(371) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `send_date` DATETIME(6) NOT NULL,
  `room_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `messages_user_id_room_id_message_send_date_UQ` (`user_id`, `room_id`, `message`, `send_date`),
  INDEX `messages_room_id_IDX` (`room_id`),
  INDEX `messages_user_id_IDX` (`user_id`),
  UNIQUE INDEX `username_code_message_send_date_UQ` (`username_code_message_send_date`),
  CONSTRAINT `messages_rooms_FK`
    FOREIGN KEY (`room_id`)
    REFERENCES `masterpiece`.`rooms` (`id`),
  CONSTRAINT `messages_users_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `masterpiece`.`users` (`id`));