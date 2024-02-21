--CREATE DATABASE
-- ####################################################################
-- # Basic CREATE DATABASE statement
-- # See https://www.ibm.com/docs/en/db2-for-zos/13?topic=statements-create-database for complete syntax.
-- ####################################################################
CREATE DATABASE kingsman,

-- Create table for categories
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

--Create table for users

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


-- Create table for products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    color VARCHAR(50),
    image_url VARCHAR(255), -- Added column for image URL
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);


INSERT INTO Products (name, description, price, color, image_url, category_id) VALUES
('Running Shoes', 'Comfortable running shoes for athletes', 49.99, 'Black', 'image_url1.jpg', 1),
('Slim Fit Suit', 'Formal slim fit suit for men', 199.99, 'Navy Blue', 'image_url2.jpg', 2),
('Cotton Shirt', 'Casual cotton shirt for everyday wear', 29.99, 'White', 'image_url3.jpg', 3),
('Denim Shorts', 'Stylish denim shorts for summer', 39.99, 'Blue', 'image_url4.jpg', 4),
('Slim Fit Trousers', 'Slim fit trousers for a modern look', 49.99, 'Gray', 'image_url5.jpg', 5),
('Classic Blazer', 'Classic blazer for formal occasions', 99.99, 'Black', 'image_url6.jpg', 6),
('Analog Watch', 'Analog watch with leather strap', 79.99, 'Brown', 'image_url7.jpg', 7);



-- Create table for product attributes
CREATE TABLE product_attributes (
    product_id INT,
    attribute_name VARCHAR(50) NOT NULL,
    attribute_value VARCHAR(50) NOT NULL,
    PRIMARY KEY (product_id, attribute_name, attribute_value),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample data for product attributes
INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES
    (1, 'Color', 'Black'),
    (1, 'Size', 'M'),
    (2, 'Color', 'Blue'),
    (2, 'Size', 'L'),
    (3, 'Color', 'Red'),
    (3, 'Size', 'S'),
    (4, 'Color', 'Gray'),
    (4, 'Size', 'M'),
    (5, 'Color', 'White'),
    (5, 'Size', 'L'),
    (6, 'Color', 'Green'),
    (6, 'Size', 'XL');
