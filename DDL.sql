-- -----------------------------------------------------------------------------
-- Project Group 41 - Gamer Gang
-- Joel Villamor & Samantha Lin
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
-- Disable commits and foreign key checks
-- -----------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;


-- -----------------------------------------------------------------------------
-- Create tables
-- -----------------------------------------------------------------------------

-- Create Customers table
CREATE OR REPLACE TABLE `Customers` (
    `id_customer` int AUTO_INCREMENT UNIQUE NOT NULL,
    `name` varchar(100) NOT NULL,
    `email` varchar(100),
    PRIMARY KEY (`id_customer`)
);

-- Create Employees table
CREATE OR REPLACE TABLE `Employees` (
    `id_employee` int AUTO_INCREMENT UNIQUE NOT NULL,
    `name` varchar(100) NOT NULL,
    `hourly_rate` decimal(10,2) DEFAULT 19.50,
    `hours_worked` int DEFAULT 0,
    `total_sales` int DEFAULT 0,
    PRIMARY KEY (`id_employee`)
);

-- Create Types table
CREATE OR REPLACE TABLE `Types` (
    `id_type` int AUTO_INCREMENT UNIQUE NOT NULL,
    `description` varchar(200) NOT NULL,
    PRIMARY KEY (`id_type`)
);

-- Create Products table
CREATE OR REPLACE TABLE `Products` (
    `id_product` int AUTO_INCREMENT UNIQUE NOT NULL,
    `name` varchar(200) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `stock` int DEFAULT 0,
    `id_type` int NOT NULL,
    PRIMARY KEY (`id_product`),
    FOREIGN KEY (`id_type`) REFERENCES `Types`(`id_type`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Sales table
CREATE OR REPLACE TABLE `Sales` (
    `id_sale` int AUTO_INCREMENT UNIQUE NOT NULL,
    `date` date,
    `total_price` decimal(10,2) NOT NULL,
    `id_customer` int,
    `id_employee` int,
    PRIMARY KEY (`id_sale`),
    FOREIGN KEY (`id_customer`) REFERENCES `Customers`(`id_customer`)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (`id_employee`) REFERENCES `Employees`(`id_employee`)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Product_Sales table
CREATE OR REPLACE TABLE `Product_Sales` (
    `id_product_sale` int AUTO_INCREMENT UNIQUE NOT NULL,
    `id_product` int,
    `id_sale` int,
    PRIMARY KEY (`id_product_sale`),
    FOREIGN KEY (`id_product`) REFERENCES `Products`(`id_product`)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (`id_sale`) REFERENCES `Sales`(`id_sale`)
        ON DELETE SET NULL ON UPDATE CASCADE
);


-- -----------------------------------------------------------------------------
-- Insert sample data into tables
-- -----------------------------------------------------------------------------

-- Insert Customers data
INSERT INTO `Customers` (`name`, `email`)
VALUES
('Jake Williams', 'jakew@woah.com'),
('Sarah Koohr', 'sarak@woah.com'),
('Miles Warner', 'milew@woah.com');

-- Insert Employees data
INSERT INTO `Employees` (`name`, `hourly_rate`, `hours_worked`, `total_sales`)
VALUES
('Joel Villamor', 21.50, 154, 22),
('Samantha Lin', 21.50, 150, 19),
('Kelly Walker', 19.50, 82, 7);

-- Insert Types data
INSERT INTO `Types` (`description`)
VALUES
('Game'),
('DLC'),
('In-game Currency');

-- Insert Products data
INSERT INTO `Products` (`name`, `price`, `stock`, `id_type`)
VALUES
('Elden Ring', 59.99, 4, 1),
('Animal Crossing', 19.99, 6, 1),
('5,000 Bells', 4.99, 10, 3);

-- Insert Sales data
INSERT INTO `Sales` (`date`, `total_price`, `id_customer`, `id_employee`)
VALUES
('2022-12-20', 19.99, 1, 3),
('2023-01-03', 9.98, 1, 3),
('2023-01-13', 24.98, 3, 1),
('2023-04-23', 59.99, 1, 2);

-- Insert Product_Sales data
INSERT INTO `Product_Sales` (`id_product`, `id_sale`)
VALUES
(2, 1),
(3, 2),
(3, 2),
(2, 3),
(3, 3),
(1, 4);


-- -----------------------------------------------------------------------------
-- Re-enable commits and foreign key checks
-- -----------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
