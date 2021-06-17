-- -----------------------------------------------------
-- Create schema masterpiece
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `masterpiece`;
CREATE SCHEMA IF NOT EXISTS `masterpiece`;
USE `masterpiece`;

-- -----------------------------------------------------
-- Create table `masterpiece`.`speakers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`speakers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `speakers_username_UQ` (`username`));


-- -----------------------------------------------------
-- Create table `masterpiece`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`chats` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `access_code` VARCHAR(10) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `speaker_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `chats_speaker_id_IDX` (`speaker_id`),
  UNIQUE INDEX `chats_access_code_UQ` (`access_code`),
  CONSTRAINT `chats_speakers_FK`
    FOREIGN KEY (`speaker_id`)
    REFERENCES `masterpiece`.`speakers` (`id`));


-- -----------------------------------------------------
-- Create table `masterpiece`.`guests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`guests` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `pseudo` VARCHAR(80) NOT NULL,
  `chat_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `guests_chat_id_IDX` (`chat_id`),
  UNIQUE INDEX `guests_pseudo_UQ` (`pseudo`),
  CONSTRAINT `guests_rooms_FK`
    FOREIGN KEY (`chat_id`)
    REFERENCES `masterpiece`.`chats` (`id`));


-- -----------------------------------------------------
-- Create table `masterpiece`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`messages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `send_date` DATETIME NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `chat_id` BIGINT NOT NULL,
  `speaker_id` BIGINT,
  `guest_id` BIGINT,
  PRIMARY KEY (`id`),
  INDEX `messages_room_id_IDX` (`chat_id`),
  INDEX `messages_speaker_id_IDX` (`speaker_id`),
  INDEX `messages_guest_id_IDX` (`guest_id`),
  UNIQUE INDEX `messages_send_date_speaker_id_guest_id` (`send_date`, `speaker_id`, `guest_id`),
  CONSTRAINT `messages_chats_FK`
    FOREIGN KEY (`chat_id`)
    REFERENCES `masterpiece`.`chats` (`id`),
  CONSTRAINT `messages_speakers_FK`
    FOREIGN KEY (`speaker_id`)
    REFERENCES `masterpiece`.`speakers` (`id`),
  CONSTRAINT `messages_guests_FK`
    FOREIGN KEY (`guest_id`)
    REFERENCES `masterpiece`.`guests` (`id`));
