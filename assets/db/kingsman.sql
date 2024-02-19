-- Create table for categories
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL
);

-- Create table for products
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create table for product attributes
CREATE TABLE product_attributes (
    product_id INT,
    attribute_name VARCHAR(50) NOT NULL,
    attribute_value VARCHAR(50) NOT NULL,
    PRIMARY KEY (product_id, attribute_name, attribute_value),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample data for categories
INSERT INTO categories (name) VALUES
    ('Suits'),
    ('Shorts'),
    ('Shirts');

-- Sample data for products
INSERT INTO products (name, category_id, price) VALUES
    ('Suit 1', 1, 199.99),
    ('Suit 2', 1, 249.99),
    ('Short 1', 2, 49.99),
    ('Short 2', 2, 59.99),
    ('Shirt 1', 3, 29.99),
    ('Shirt 2', 3, 39.99);

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
