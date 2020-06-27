-- -----------------------------------------------------
-- Schema masterpiece
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `masterpiece`;
CREATE SCHEMA IF NOT EXISTS `masterpiece`;
USE `masterpiece` ;

-- -----------------------------------------------------
-- Table `masterpiece`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`accounts` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `enabled` BIT(1) NOT NULL DEFAULT 1,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `accounts_username_UQ` (`username`),
  UNIQUE INDEX `accounts_email_UQ` (`email`));


-- -----------------------------------------------------
-- Table `masterpiece`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(255) NOT NULL,
  `default_role` BIT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `roles_code_UQ` (`code`));


-- -----------------------------------------------------
-- Table `masterpiece`.`accounts_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterpiece`.`accounts_roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `accounts_roles_account_id_IDX` (`account_id`),
  INDEX `accounts_roles_role_id_IDX` (`role_id`),
  INDEX `accounts_roles_account_id_role_id_UQ` (`account_id`, `role_id`),
  CONSTRAINT `accounts_roles_account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `masterpiece`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `accounts_roles_role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `masterpiece`.`roles` (`id`));
