-- Active: 1733837847961@@127.0.0.1@3306@ecommerce
CREATE TABLE branches (
    branchID VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    operating_hours VARCHAR(50) NOT NULL,
    link VARCHAR(100)
);

INSERT INTO branches (branchID, name, address, operating_hours, link)
VALUES
    ('MK50480', 'Solaris Mont Kiara', 'L-5-1, Solaris Mont Kiara, Jalan Solaris, Off Jalan Duta Kiara, 50480, Kuala Lumpur', '10:00 AM - 6:00 PM', '8qT2dKUGSaUP36hz7'),
    ('SN47810', 'Sunway Nexis', 'A-1-6, Sunway Nexis, Jalan PJU5/1, Kota Damansara, Petaling Jaya 47810, Selangor', '10:00 AM - 6:00 PM', '1dhDr7wAwzcNaWP1A'),
    ('WF11900', 'Queens Residences Q2', '3-1-2, Queens Residences Q2, Jalan Bayan Indah, 11900, Bayan Lepas, Pulau Pinang', '10:00 AM - 6:00 PM', 'qifMavDRWxqAuAit7');

CREATE TABLE category (
    categoryID VARCHAR(7) PRIMARY KEY, 
    name VARCHAR(50) NOT NULL UNIQUE,
    parentID VARCHAR(7), 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (parentID) REFERENCES category(categoryID) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO category(categoryID, name)
VALUES
    ('K0013DP', '3D Print'),
    ('K002ELE', 'Electronics');

INSERT INTO category(categoryID, name, parentID)
VALUES
    ('3DP001A', 'Animal', 'K0013DP'),
    ('3DP002V', 'Vehicle', 'K0013DP'),
    ('3DP003O', 'Others', 'K0013DP'),
    ('ELE001K', 'K-Box', 'K002ELE'),
    ('ELE002B', 'Boards', 'K002ELE'),
    ('ELE003C', 'Components', 'K002ELE'),
    ('ELE004W', 'Wires/Cables','K002ELE');

CREATE TABLE product (
  productID varchar(10) NOT NULL,
  productName varchar(30) NOT NULL,
  description text,
  img varchar(255) DEFAULT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock int NOT NULL,
  categoryID varchar(7) DEFAULT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive') DEFAULT 'active',
  PRIMARY KEY (productID),
  FOREIGN KEY (categoryID) REFERENCES category(categoryID) ON DELETE SET NULL
);

INSERT INTO product (productID, productName, description, img, price, stock, categoryID)
VALUES 
    ('KP001', '3D Printed Cat', 'A cute 3D printed cat figurine.', 'images\\3dprintedcat.jpeg', 15.99, 50, '3DP001A'),
    ('KP002', '3D Truck Model', 'A detailed truck model made using 3D printing.', 'images\\3dtruck.jpeg', 25.99, 25, '3DP002V'),
    ('KP003', 'Arduino Uno Board', 'Original Arduino Uno R3 development board.', 'images\\Arduino.jpg', 28.99, 15, 'ELE002B'),
    ('KP004', 'K-Box Starter Kit', 'All-in-one K-Box for beginners.', 'images\\kbox-basic.jpg', 50, 20, 'ELE001K'),
    ('KP005', 'LED Lights Pack', 'A pack of assorted LED lights.', 'images\\led.jpg', 5.99, 10, 'ELE003C'),
    ('KP006', 'USB Cable', 'Durable USB-A to USB-B cable', 'images\\wire.jpeg', 3.49, 49, 'ELE004W');

CREATE TABLE user (
  userID varchar(4) NOT NULL,
  firstName varchar(100) DEFAULT NULL,
  lastName varchar(100) DEFAULT NULL,
  email varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  phone varchar(15) DEFAULT NULL,
  address text,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (userID),
  UNIQUE KEY email(email)
);

INSERT INTO user (userID, firstName, lastName, email, password, phone, address)
VALUES 
    ('A001', 'Nurul', 'Izzati', 'nurulizzatihayat@gmail.com', '$2b$12$NsF71m655Vh.hX6AjNm4huhvN3//gal9Qh/WblOCmJF0VC88Emf0a', '01123768906', 'Kuala Lumpur'),
    ('C001', 'John', 'Doe', 'john.doe@example.com', '$2b$12$aJYYm73Du78flQxrT7cbu.wufwbfMLhL2UsCb84nQIx4gMRemGoyi', '1234567890', '123 Main St, City, Country'),
    ('C002', 'Jane', 'Smith', 'jane.smith@example.com', '$2b$12$R2uJMT8XPPQUDtSQ4GcZQOOEaoTfGfLjlaQMk1Q68Ngqsqp4QPqhu', '0987654321', '456 Another St, City, Country'),
    ('C003', 'Alice', 'Johnson', 'alice.johnson@example.com', '$2b$12$twCjk04hc6M83brvAr0HfOnw889ZIMGz8m4J1Mzi7UaS9APpETnyi', '1122334455', '789 Third St, City, Country');

CREATE TABLE orders (
  orderID VARCHAR(13) NOT NULL UNIQUE,
  userID varchar(4) NOT NULL,
  totalAmount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  shippingMethod VARCHAR(50) NOT NULL,
  dropLocation TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (orderID),
  CONSTRAINT fk_customer FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
);

INSERT INTO orders (orderID, userID, totalAmount, status, dropLocation, shippingMethod)
VALUES 
    ('KSHOP01234567', 'C001', 73.97, 'Pending', '123 Main St, City, Country', 'Pick Up'),            
    ('KSHOP12345678', 'C002', 81.98, 'Completed', '456 Another St, City, Country', 'Delivery'),  
    ('KSHOP23456789', 'C003', 31.98, 'Shipped', '789 Third St, City, Country', 'Pick Up'); 

CREATE TABLE orderitem (
  orderItemID INT NOT NULL AUTO_INCREMENT,
  orderID VARCHAR(13) NOT NULL,
  productID varchar(10) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (orderItemID),
  FOREIGN KEY (orderID) REFERENCES orders (orderID),
  FOREIGN KEY (productID) REFERENCES product (productID)
);

INSERT INTO orderitem (orderID, productID, quantity, price)
VALUES
  ('KSHOP01234567', 'KP001', 1, 15.99),
  ('KSHOP01234567', 'KP003', 2, 28.99),
  ('KSHOP12345678', 'KP002', 1, 25.99),
  ('KSHOP12345678', 'KP004', 1, 50), 
  ('KSHOP12345678', 'KP005', 1, 5.99),
  ('KSHOP23456789', 'KP002', 1, 25.99);
  
CREATE TABLE payment (
  paymentID int NOT NULL AUTO_INCREMENT,
  orderID VARCHAR(13) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  deliveryCharge DECIMAL(10, 2) NOT NULL,
  paymentMethod varchar(30),
  status ENUM('pending', 'received', 'completed', 'cancelled') DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (paymentID),
  FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE CASCADE
);

INSERT INTO payment (orderID, amount, deliveryCharge, paymentMethod, status)
VALUES 
    ('KSHOP01234567', 73.97, 0.00, 'Credit Card', 'Pending'),
    ('KSHOP12345678', 81.98, 10.00, 'Bank Transfer', 'Completed'),
    ('KSHOP23456789', 31.98, 0.00, 'Cash', 'Received');

CREATE TABLE review (
  reviewID INT NOT NULL AUTO_INCREMENT,
  productID varchar(10) NOT NULL,
  userID varchar(4) NOT NULL,
  rating INT DEFAULT NULL,
  comment TEXT,
  response TEXT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (reviewID),
  FOREIGN KEY (productID) REFERENCES product(productID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
);

INSERT INTO review (productID, userID, rating, comment, response)
VALUES
    ('KP001', 'C001', 4, 'The 3D Printed Cat is cute, but the finishing could be better.', NULL),
    ('KP003', 'C001', 5, 'Great product! The Arduino Uno Board is working perfectly.', NULL),
    ('KP002', 'C002', 5, 'The 3D Truck Model looks amazing! Very detailed and realistic.', NULL),
    ('KP004', 'C002', 4, 'The K-Box Starter Kit is great for beginners, but could use a better manual.', NULL),
    ('KP005', 'C002', 5, 'I loved the LED Lights Pack! The variety and quality are great.', NULL),
    ('KP005', 'C003', 3, 'The LED Lights Pack was okay, but the colors were not as vibrant as expected.', NULL),
    ('KP006', 'C003', 5, 'The USB Cable is sturdy and does its job perfectly.', NULL);

CREATE TABLE feedback (
    feedbackID VARCHAR(4) PRIMARY KEY,
    name varchar(255) NOT NULL, 
    email varchar(255) NOT NULL,
    `type` ENUM('Bug', 'Suggestion', 'Praise', 'Complaint', 'Other') NOT NULL,
    `text` TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Reviewed', 'Resolved') DEFAULT 'Pending',
    response TEXT NULL, 
    severity ENUM('Low', 'Medium', 'High', 'Critical') NULL
);

INSERT INTO feedback (feedbackID, name, email, type, text, status, response, severity)
VALUES
    ('B001', 'john','john.doe@example.com', 'Bug', 'The website crashes when I try to check out.', 'Pending', NULL, 'High'),
    ('S001', 'alice', 'alice.jonhson@example.com', 'Suggestion', 'Add a dark mode feature for better usability at night.', 'Reviewed', 'Thank you for the suggestion! We are considering it.', 'Low'),
    ('P001', 'jane', 'jane.smith@example.com', 'Praise', 'Great user experience! The website is intuitive and fast.', 'Reviewed', 'Thank you for your kind words!', NULL),
    ('C001', 'smith' ,'test@example.com', 'Complaint', 'Customer support response is very slow.', 'Resolved', 'We apologize for the inconvenience. We have addressed this issue with our support team.', 'Medium');
