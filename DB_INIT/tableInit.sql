CREATE DATABASE `WoxDB` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE WoxDB;

CREATE TABLE `layouts` (
  `layoutId` varchar(20) NOT NULL,
  `coltype` varchar(20) NOT NULL DEFAULT '"single"',
  `backgroundColor` varchar(20) DEFAULT '"white"',
  `navBar` varchar(20) DEFAULT '"simple"',
  PRIMARY KEY (`layoutId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Pages` (
  `pageId` varchar(10) NOT NULL,
  PRIMARY KEY (`pageId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
  `Name` varchar(45) DEFAULT NULL,
  `Role` varchar(45) DEFAULT NULL,
  `Password` varchar(1024) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



