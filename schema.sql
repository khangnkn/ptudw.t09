-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TechhubDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TechhubDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TechhubDB` DEFAULT CHARACTER SET utf8 ;
USE `TechhubDB` ;

-- -----------------------------------------------------
-- Table `TechhubDB`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Users` (
  `Id` INT NOT NULL,
  `Username` VARCHAR(30) NOT NULL,
  `Password` VARCHAR(30) NOT NULL,
  `Fullname` VARCHAR(45) NULL,
  `Email` VARCHAR(20) NULL,
  `Birthday` DATE NULL,
  `Avatar` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Writers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Writers` (
  `Id` INT NOT NULL,
  `Alias` VARCHAR(45) NULL,
  CONSTRAINT `FK_PK_Writers_Users`
    FOREIGN KEY (`Id`)
    REFERENCES `TechhubDB`.`Users` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Editors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Editors` (
  `Id` INT NOT NULL,
  `ManagedCate` VARCHAR(45) NULL,
  CONSTRAINT `FK_PK_Editors_Users`
    FOREIGN KEY (`Id`)
    REFERENCES `TechhubDB`.`Users` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Subcribers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Subcribers` (
  `Id` INT NOT NULL,
  `Premium` INT NOT NULL,
  CONSTRAINT `FK_PK_Subcribers_Users`
    FOREIGN KEY (`Id`)
    REFERENCES `TechhubDB`.`Users` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Categories` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`SubCategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`SubCategories` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Category` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) ,
  INDEX `FK_SubCategories_Categories_idx` (`Category` ASC) ,
  CONSTRAINT `FK_SubCategories_Categories`
    FOREIGN KEY (`Category`)
    REFERENCES `TechhubDB`.`Categories` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Articles` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Category` INT NOT NULL,
  `Date` DATE NULL,
  `Cover` VARCHAR(45) NULL,
  `Content` TEXT NULL,
  `Abstract` TEXT NULL,
  `RejectReason` TEXT NULL,
  PRIMARY KEY (`Id`, `Category`),
  INDEX `FK_Articles_Categories_idx` (`Category` ASC) ,
  CONSTRAINT `FK_Articles_Categories`
    FOREIGN KEY (`Category`)
    REFERENCES `TechhubDB`.`SubCategories` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Tags` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Articles_Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Articles_Tags` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `idTag` INT NOT NULL,
  `idArticle` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_Articles_Tags_Articles_idx` (`idArticle` ASC) ,
  INDEX `FK_Articles_Tags_Tags_idx` (`idTag` ASC) ,
  CONSTRAINT `FK_Articles_Tags_Articles`
    FOREIGN KEY (`idArticle`)
    REFERENCES `TechhubDB`.`Articles` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Articles_Tags_Tags`
    FOREIGN KEY (`idTag`)
    REFERENCES `TechhubDB`.`Tags` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TechhubDB`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TechhubDB`.`Admins` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
