-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: WoxDB
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `id` varchar(45) NOT NULL,
  `author` varchar(45) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `component` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `replies` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Config`
--

DROP TABLE IF EXISTS `Config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Config` (
  `id` varchar(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Config`
--

LOCK TABLES `Config` WRITE;
/*!40000 ALTER TABLE `Config` DISABLE KEYS */;
INSERT INTO `Config` VALUES ('requestcounter','Request counter','0');
/*!40000 ALTER TABLE `Config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Images`
--

DROP TABLE IF EXISTS `Images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Images` (
  `id` varchar(45) NOT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `src` varchar(250) DEFAULT NULL,
  `long` int(11) DEFAULT NULL,
  `lat` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `compressed_src` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Images`
--

LOCK TABLES `Images` WRITE;
/*!40000 ALTER TABLE `Images` DISABLE KEYS */;
INSERT INTO `Images` VALUES ('6a9a6930-2505-11ea-b3ad-91a6032db6d2','.jpg','party','/v1/api/images/6a9a6930-2505-11ea-b3ad-91a6032db6d2.jpg',4,51,6000,4000,'/v1/api/compressed_images/6a9a6930-2505-11ea-b3ad-91a6032db6d2.jpg'),('7c06ca40-2507-11ea-b3ad-91a6032db6d2','.png','RedButton','/v1/api/images/7c06ca40-2507-11ea-b3ad-91a6032db6d2.png',NULL,NULL,200,200,'/v1/api/compressed_images/7c06ca40-2507-11ea-b3ad-91a6032db6d2.png'),('7cc1b2a0-2503-11ea-b3ad-91a6032db6d2','.jpg','Carousel1','/v1/api/images/7cc1b2a0-2503-11ea-b3ad-91a6032db6d2.jpg',NULL,NULL,1920,1080,'/v1/api/compressed_images/7cc1b2a0-2503-11ea-b3ad-91a6032db6d2.jpg'),('7ccf3540-2505-11ea-b3ad-91a6032db6d2','.jpg','friends','/v1/api/images/7ccf3540-2505-11ea-b3ad-91a6032db6d2.jpg',87,28,5472,3648,'/v1/api/compressed_images/7ccf3540-2505-11ea-b3ad-91a6032db6d2.jpg'),('83c2c210-2503-11ea-b3ad-91a6032db6d2','.JPG','Carousel2','/v1/api/images/83c2c210-2503-11ea-b3ad-91a6032db6d2.JPG',NULL,NULL,3940,2626,'/v1/api/compressed_images/83c2c210-2503-11ea-b3ad-91a6032db6d2.JPG'),('9ed7e810-2507-11ea-b3ad-91a6032db6d2','.png','Purple button','/v1/api/images/9ed7e810-2507-11ea-b3ad-91a6032db6d2.png',NULL,NULL,200,200,'/v1/api/compressed_images/9ed7e810-2507-11ea-b3ad-91a6032db6d2.png'),('a05e24d0-2505-11ea-b3ad-91a6032db6d2','.jpg','talking','/v1/api/images/a05e24d0-2505-11ea-b3ad-91a6032db6d2.jpg',4,51,5472,3648,'/v1/api/compressed_images/a05e24d0-2505-11ea-b3ad-91a6032db6d2.jpg');
/*!40000 ALTER TABLE `Images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Layouts`
--

DROP TABLE IF EXISTS `Layouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Layouts` (
  `id` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `columnType` varchar(20) DEFAULT NULL,
  `backgroundColor` varchar(20) DEFAULT NULL,
  `navbar` int(11) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `navcontent` json DEFAULT NULL,
  `footer` int(11) DEFAULT NULL,
  `footcontent` varchar(1024) DEFAULT NULL,
  `pages` json DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `editor` varchar(45) DEFAULT NULL,
  `customIcon` int(11) DEFAULT NULL,
  `iconId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Layouts`
--

LOCK TABLES `Layouts` WRITE;
/*!40000 ALTER TABLE `Layouts` DISABLE KEYS */;
INSERT INTO `Layouts` VALUES ('Default','Default layout','small-left','rgb(255, 152, 0)',1,'Woxpace','[\"Default\", \"b436d250-2504-11ea-b3ad-91a6032db6d2\"]',1,'WoxPace™ Made by Corneel - Aäron - Wolf','[\"Default\", \"b436d250-2504-11ea-b3ad-91a6032db6d2\"]','This is the default layout that will be used when no other layout is specified','2019-12-22','admin',0,'/');
/*!40000 ALTER TABLE `Layouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pages`
--

DROP TABLE IF EXISTS `Pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pages` (
  `id` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `editor` varchar(45) DEFAULT NULL,
  `published` int(11) DEFAULT NULL,
  `compsL` json DEFAULT NULL,
  `compsM` json DEFAULT NULL,
  `compsR` json DEFAULT NULL,
  `date` date DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `layout` varchar(45) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pages`
--

LOCK TABLES `Pages` WRITE;
/*!40000 ALTER TABLE `Pages` DISABLE KEYS */;
INSERT INTO `Pages` VALUES ('b436d250-2504-11ea-b3ad-91a6032db6d2','Pictures Page','admin',1,'[\"060f6d80-2505-11ea-b3ad-91a6032db6d2\"]','[\"a15e56c0-2505-11ea-b3ad-91a6032db6d2\"]','[]','2019-12-22','pictures','Default','Show off the picturefolder and'),('Default','Homepage','admin',1,'[\"4180c870-2503-11ea-b3ad-91a6032db6d2\"]','[\"d0378310-2503-11ea-b3ad-91a6032db6d2\", \"bf0e5dd0-2507-11ea-b3ad-91a6032db6d2\"]','[]','2019-12-22','default','Default','default page');
/*!40000 ALTER TABLE `Pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('admin','admin@admin.be','admin','$2a$10$Rhk4N.uNIwtsEumSjmQEh.3qGwTlTBvD2PoveUQszCd1i8lav0bjK','2019-12-08','admin');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WoxComponents`
--

DROP TABLE IF EXISTS `WoxComponents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WoxComponents` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `editor` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` json DEFAULT NULL,
  `pages` json DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `commentable` int(11) DEFAULT NULL,
  `comments` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WoxComponents`
--

LOCK TABLES `WoxComponents` WRITE;
/*!40000 ALTER TABLE `WoxComponents` DISABLE KEYS */;
INSERT INTO `WoxComponents` VALUES ('060f6d80-2505-11ea-b3ad-91a6032db6d2','admin','Pictures Page Heading',NULL,'text','{\"text\": \"# YOU MADE IT!\\nHere is a nice example of a picture folder woxComponent, as you can see it\'s perfect \\nfor showing pictures to friends and family\"}','[\"b436d250-2504-11ea-b3ad-91a6032db6d2\"]','2019-12-23','The heading of the pictures page',0,'[]'),('4180c870-2503-11ea-b3ad-91a6032db6d2','admin','Welcome Text',NULL,'text','{\"text\": \"# Welcome to WoxPace\\nWe are very glad to see you here. This component is called a Text component, \\nit can be edited by an admin by going to the *woxComponents* tab and editing *Welcome Text*.\"}','[\"Default\"]','2019-12-23','The welcome text for new admins of the website',0,'[]'),('859a9280-2507-11ea-b3ad-91a6032db6d2','admin','Example ClickableButton Red',NULL,'clickablePicture','{\"id\": \"7c06ca40-2507-11ea-b3ad-91a6032db6d2\", \"link\": \"https://tinyurl.com/uvcng7v\"}','[]','2019-12-22','The red example clickable button',0,'[]'),('a15e56c0-2505-11ea-b3ad-91a6032db6d2','admin','Example PictureFolder',NULL,'pictureFolder','{\"ids\": [\"6a9a6930-2505-11ea-b3ad-91a6032db6d2\", \"7ccf3540-2505-11ea-b3ad-91a6032db6d2\", \"a05e24d0-2505-11ea-b3ad-91a6032db6d2\"], \"locationActive\": true}','[\"b436d250-2504-11ea-b3ad-91a6032db6d2\"]','2019-12-22','All these pictures where free to use from unsplash',0,'[]'),('a5d17d70-2507-11ea-b3ad-91a6032db6d2','admin','Example ClickableButton Purple',NULL,'clickablePicture','{\"id\": \"9ed7e810-2507-11ea-b3ad-91a6032db6d2\", \"link\": \"https://tinyurl.com/uvcng7v\"}','[]','2019-12-22','the purple clickable button',0,'[]'),('bf0e5dd0-2507-11ea-b3ad-91a6032db6d2','admin','Example Container',NULL,'container','{\"ids\": [\"859a9280-2507-11ea-b3ad-91a6032db6d2\", \"a5d17d70-2507-11ea-b3ad-91a6032db6d2\"]}','[\"Default\"]','2019-12-22','An example container which holds 2 clickable buttons',0,'[]'),('d0378310-2503-11ea-b3ad-91a6032db6d2','admin','Example Carousel',NULL,'carousel','{\"ids\": [\"7cc1b2a0-2503-11ea-b3ad-91a6032db6d2\", \"83c2c210-2503-11ea-b3ad-91a6032db6d2\"], \"captions\": false, \"captionActive\": false, \"customCaption\": false, \"singleCaption\": false}','[\"Default\"]','2019-12-22','This is an example carousel woxComponent, it contains 2 beautiful pictures of carousels',0,'[]');
/*!40000 ALTER TABLE `WoxComponents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-23 19:23:13
