-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(10) NOT NULL,
  `description` text,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Electronic','Devices like phones, laptops, and accessories.'),(2,'Clothing','Apparel, shoes, and accessories.'),(3,'Toys','Children’s toys and games.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  `secondaryAddress` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'John','Doe','john.doe@example.com','password123','555-1234','123 Main St, Springfield',NULL,'2024-11-16 12:41:30','2024-11-16 12:41:30'),(2,'Jane','Smith','jane.smith@example.com','password456','555-5678','456 Oak St, Shelbyville',NULL,'2024-11-16 12:41:30','2024-11-16 12:41:30'),(3,'Alice','Johnson','alice.johnson@example.com','password789','555-8765','789 Pine St, Capital City',NULL,'2024-11-16 12:41:30','2024-11-16 12:41:30'),(5,'Emily','Davis','emily.davis@example.com','password202','555-3333','202 Elm St, Shelbyville',NULL,'2024-11-18 10:25:30','2024-11-18 10:25:30'),(6,'David','Martinez','david.martinez@example.com','password303','555-4444','303 Birch St, Capital City',NULL,'2024-11-19 09:35:55','2024-11-19 09:35:55'),(7,'Sophia','Hernandez','sophia.hernandez@example.com','password404','555-5555','404 Cedar St, Springfield',NULL,'2024-11-20 14:45:05','2024-11-20 14:45:05'),(8,'Liam','Lopez','liam.lopez@example.com','password505','555-6666','505 Pine St, Shelbyville',NULL,'2024-11-21 11:00:15','2024-11-21 11:00:15'),(9,'Olivia','Gonzalez','olivia.gonzalez@example.com','password606','555-7777','606 Oak St, Capital City',NULL,'2024-11-22 13:20:25','2024-11-22 13:20:25'),(10,'James','Wilson','james.wilson@example.com','password707','555-8888','707 Maple St, Springfield',NULL,'2024-11-23 16:30:35','2024-11-23 16:30:35'),(11,'Mia','Anderson','mia.anderson@example.com','password808','555-9999','808 Birch St, Shelbyville',NULL,'2024-11-24 17:40:45','2024-11-24 17:40:45'),(12,'Ethan','Thomas','ethan.thomas@example.com','password909','555-0000','909 Cedar St, Capital City',NULL,'2024-11-25 18:50:55','2024-11-25 18:50:55'),(13,'Isabella','Jackson','isabella.jackson@example.com','password010','555-1235','123 Pine St, Springfield',NULL,'2024-11-26 19:15:05','2024-11-26 19:15:05'),(14,'Aiden','White','aiden.white@example.com','password111','555-6789','456 Maple St, Shelbyville',NULL,'2024-11-27 20:25:15','2024-11-27 20:25:15'),(15,'Amelia','Harris','amelia.harris@example.com','password212','555-7890','789 Birch St, Capital City',NULL,'2024-11-28 21:35:25','2024-11-28 21:35:25'),(16,'Benjamin','Clark','benjamin.clark@example.com','password313','555-1111','123 Birch St, Springfield',NULL,'2024-11-29 10:00:05','2024-11-29 10:00:05'),(17,'Charlotte','Lewis','charlotte.lewis@example.com','password414','555-2222','456 Pine St, Shelbyville',NULL,'2024-11-30 13:15:15','2024-11-30 13:15:15'),(18,'Daniel','Walker','daniel.walker@example.com','password515','555-3333','789 Maple St, Capital City',NULL,'2024-12-01 14:20:25','2024-12-01 14:20:25'),(19,'Ella','Young','ella.young@example.com','password616','555-4444','101 Cedar St, Springfield',NULL,'2024-12-02 15:30:35','2024-12-02 15:30:35'),(20,'Francis','King','francis.king@example.com','password717','555-5555','202 Birch St, Shelbyville',NULL,'2024-12-03 16:40:45','2024-12-03 16:40:45'),(21,'Grace','Scott','grace.scott@example.com','password818','555-6666','303 Pine St, Capital City',NULL,'2024-12-04 17:50:55','2024-12-04 17:50:55'),(22,'Henry','Nelson','henry.nelson@example.com','password919','555-7777','404 Maple St, Springfield',NULL,'2024-12-05 18:00:05','2024-12-05 18:00:05'),(23,'Ivy','Adams','ivy.adams@example.com','password020','555-8888','505 Cedar St, Shelbyville',NULL,'2024-12-06 19:10:15','2024-12-06 19:10:15'),(24,'Jack','Baker','jack.baker@example.com','password121','555-9999','606 Pine St, Capital City',NULL,'2024-12-07 20:20:25','2024-12-07 20:20:25'),(25,'Lily','Carter','lily.carter@example.com','password222','555-0000','707 Birch St, Springfield',NULL,'2024-12-08 21:30:35','2024-12-08 21:30:35'),(26,'Mason','Mitchell','mason.mitchell@example.com','password323','555-1111','808 Pine St, Shelbyville',NULL,'2024-12-09 10:40:45','2024-12-09 10:40:45'),(27,'Nina','Roberts','nina.roberts@example.com','password424','555-2222','909 Cedar St, Capital City',NULL,'2024-12-10 11:50:55','2024-12-10 11:50:55'),(28,'Peter','Parker','peter.parker@example.com','password001','555-0100','123 Web St, New York',NULL,'2024-11-16 12:00:00','2024-11-16 12:00:00'),(29,'Mary','Jane','mary.jane@example.com','password002','555-0101','456 Love St, New York',NULL,'2024-11-16 12:00:00','2024-11-16 12:00:00'),(30,'Tony','Stark','tony.stark@example.com','password003','555-0102','789 Stark Tower, New York',NULL,'2024-11-16 12:00:00','2024-11-16 12:00:00');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `customerID` int NOT NULL,
  `orderDate` date NOT NULL,
  `totalAmount` double NOT NULL,
  `status` varchar(15) NOT NULL,
  `shippingAddress` text NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'2024-11-10',199.99,'Pending','123 Main St, Springfield','2024-11-16 12:42:01','2024-11-16 12:42:01'),(2,2,'2024-11-11',299.99,'Shipped','456 Oak St, Shelbyville','2024-11-16 12:42:01','2024-11-16 12:42:01'),(3,3,'2024-11-12',149.99,'Delivered','789 Pine St, Capital City','2024-11-16 12:42:01','2024-11-16 12:42:01'),(4,1,'2024-11-13',89.99,'Processing','123 Main St, Springfield','2024-11-17 14:15:45','2024-11-17 14:15:45'),(5,2,'2024-11-14',49.99,'Cancelled','456 Oak St, Shelbyville','2024-11-18 09:25:00','2024-11-18 09:25:00'),(6,3,'2024-11-15',399.99,'Shipped','789 Pine St, Capital City','2024-11-19 10:30:21','2024-11-19 10:30:21'),(7,1,'2024-11-16',59.99,'Pending','123 Main St, Springfield','2024-11-20 11:45:12','2024-11-20 11:45:12'),(8,2,'2024-11-17',119.99,'Delivered','456 Oak St, Shelbyville','2024-11-21 13:00:00','2024-11-21 13:00:00'),(9,3,'2024-11-18',249.99,'Processing','789 Pine St, Capital City','2024-11-22 15:30:45','2024-11-22 15:30:45'),(10,1,'2024-11-19',75,'Pending','123 Main St, Springfield','2024-11-23 08:20:10','2024-11-23 08:20:10');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `orderItemID` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `productID` int NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`orderItemID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`),
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`),
  CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (1,1,1,1,99.99),(2,1,2,1,99.99),(3,2,3,2,149.99),(4,3,4,1,149.99),(5,3,5,1,149.99),(6,4,1,3,99.99),(7,4,2,1,99.99),(8,5,3,1,149.99),(9,5,4,2,149.99),(10,6,5,4,149.99),(11,7,1,2,99.99),(12,7,2,1,99.99),(13,8,3,1,149.99),(14,8,4,3,149.99),(15,9,5,1,149.99),(16,9,1,1,99.99),(17,10,2,2,99.99),(18,10,3,3,149.99);
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentID` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` double NOT NULL,
  `paymentMethod` varchar(30) NOT NULL,
  `status` varchar(15) NOT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,'2024-11-10',199.99,'Credit Card','Pending'),(2,2,'2024-11-11',299.99,'PayPal','Completed'),(3,3,'2024-11-12',149.99,'Debit Card','Completed'),(4,4,'2024-11-13',249.99,'Credit Card','Completed'),(5,5,'2024-11-14',359.99,'PayPal','Pending'),(6,6,'2024-11-15',499.99,'Debit Card','Completed'),(7,7,'2024-11-16',119.99,'Credit Card','Pending'),(8,8,'2024-11-17',399.99,'PayPal','Completed'),(9,9,'2024-11-18',259.99,'Debit Card','Pending'),(10,10,'2024-11-19',89.99,'Credit Card','Completed');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(30) NOT NULL,
  `description` text,
  `img` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `categoryID` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`productID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Wireless Mouse','Ergonomic wireless mouse with adjustable DPI settings',NULL,29.99,150,1,'2024-11-15 18:10:31','2024-11-15 19:11:48'),(2,'Bluetooth Headphones','Noise-cancelling over-ear Bluetooth headphones',NULL,89.99,85,2,'2024-11-15 18:10:31','2024-11-15 18:10:31'),(3,'Gaming Laptop','High-performance gaming laptop with 16GB RAM and 1TB SSD',NULL,1299.99,20,3,'2024-11-15 18:10:31','2024-11-15 18:10:31'),(4,'Smartwatch','Smartwatch with heart rate monitor and fitness tracking features',NULL,199.99,200,1,'2024-11-15 18:10:31','2024-11-15 18:10:31'),(5,'4K Monitor','Ultra HD 4K monitor with 27-inch display',NULL,349.99,50,2,'2024-11-15 18:10:31','2024-11-15 19:48:21'),(7,'Z flip','flip phone','images\\phone.jpg',4999.99,100,1,'2024-12-05 03:48:42','2024-12-05 03:48:42');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `productID` int NOT NULL,
  `customerID` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewID`),
  KEY `productID` (`productID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`),
  CONSTRAINT `review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,5,'Great product, highly recommend!','2024-11-16 12:41:45'),(2,2,2,4,'Good quality, but a bit expensive.','2024-11-16 12:41:45'),(3,3,3,3,'It works, but not as expected.','2024-11-16 12:41:45'),(4,4,1,5,'Absolutely love this product! Will buy again.','2024-11-16 12:41:45'),(5,5,2,2,'Didn\'t meet my expectations, could be improved.','2024-11-16 12:41:45'),(6,1,6,4,'Solid product, would recommend.','2024-11-17 10:25:30'),(7,2,7,3,'Average quality, expected better for the price.','2024-11-17 11:00:45'),(8,3,8,5,'Exceeded my expectations, very satisfied!','2024-11-17 12:15:20'),(9,4,9,2,'Poor build quality, not worth it.','2024-11-17 13:45:00'),(10,5,10,4,'Good product, but shipping was slow.','2024-11-17 14:30:15');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;

--
-- Dumping routines for database 'ecommerce'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 12:10:03
