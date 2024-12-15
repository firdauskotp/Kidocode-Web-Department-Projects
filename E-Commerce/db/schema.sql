CREATE DATABASE kidocodeshop_users;
USE kidocodeshop_users;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    contactNumber INT NOT NULL,
    userAddress VARCHAR(100) NOT NULL,
    cityAddress VARCHAR(50) NOT NULL,
    stateAddress VARCHAR(50) NOT NULL,
    postcodeAddress INT(5) NOT NULL
);

CREATE TABLE products(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT,
    image_url VARCHAR(255), -- To store URL or file path of product's image.
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products(product_id, name, description, price, stock, category_id, image_url, status)
VALUES
    (1, 'Testing 01', 'This product is just a testing due to the current situation is testing.', 9.99, 1, 1, 'static/images/dummy.png', 'active'),
    (2, 'Testing 02', 'This product is just a testing due to the current situation is testing.', 19.99, 2, 2, 'static/images/dummy2.png', 'active'),
    (3, 'Testing 03', 'This product is just a testing due to the current situation is testing.', 29.99, 3, 3, 'static/images/dummy3.png', 'active'),
    (4, 'Testing 04', 'This product is just a testing due to the current situation is testing.', 39.99, 4, 4, 'static/images/dummy4.png', 'active'),
    (5, 'Testing 05', 'This product is just a testing due to the current situation is testing.', 49.99, 5, 5, 'static/images/dummy5.png', 'active'),
    (6, 'Testing 06', 'This product is just a testing due to the current situation is testing.', 59.99, 6, 6, 'static/images/dummy6.png', 'active'),
    (7, 'Testing 07', 'This product is just a testing due to the current situation is testing.', 69.99, 7, 7, 'static/images/dummy7.png', 'active'),
    (8, 'Testing 08', 'This product is just a testing due to the current situation is testing.', 79.99, 8, 8, 'static/images/dummy8.png', 'active'),
    (9, 'Testing 09', 'This product is just a testing due to the current situation is testing.', 89.99, 9, 9, 'static/images/dummy9.png', 'active'),
    (10, 'Testing 10', 'This product is just a testing due to the current situation is testing.', 99.99, 10, 10, 'static/images/dummy10.png', 'active')