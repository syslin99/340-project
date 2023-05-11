-- -----------------------------------------------------------------------------
-- Project Group 41 - Gamer Gang
-- Joel Villamor & Samantha Lin
-- -----------------------------------------------------------------------------
-- NOTE: the colon (:) character is used to denote variables whose values will be provided by the back-end programming language


-- -----------------------------------------------------------------------------
-- CRUD operations for Customers table
-- -----------------------------------------------------------------------------

-- Display all Customers
SELECT * FROM `Customers`;

-- Insert a Customer
INSERT INTO `Customers` (`name`, `email`)
VALUES (:nameInput, :emailInput);

-- Update a Customer
    -- Populate the "Update Customer" form
    SELECT * FROM `Customers`
    WHERE `id_customer` = :idInput;
    -- Update the Customer
    UPDATE `Customers`
    SET `name` = :nameInput, `email` = :emailInput
    WHERE `id_customer` = :idInput;

-- Delete a Customer
    -- Populate the "Delete Customer" form
    SELECT * FROM `Customers`
    WHERE `id_customer` = :idInput;
    -- Delete the Customer
    DELETE FROM `Customers`
    WHERE `id_customer` = :idInput;


-- -----------------------------------------------------------------------------
-- CRUD operations for Employees table
-- -----------------------------------------------------------------------------

-- Display all Employees
SELECT * FROM `Employees`;

-- Insert an Employee
INSERT INTO `Employees` (`name`, `hourly_rate`, `hours_worked`, `total_sales`)
VALUES (:nameInput, :rateInput, :hoursInput, :salesInput);

-- Update an Employee
    -- Populate the "Update Employee" form
    SELECT * FROM `Employees`
    WHERE `id_employee` = :idInput;
    -- Update the Employee
    UPDATE `Employees`
    SET `name` = :nameInput, `hourly_rate` = :rateInput, `hours_worked` = :hoursInput, `total_sales` = :salesInput
    WHERE `id_employee` = :idInput;

-- Delete an Employee
    -- Populate the "Delete Employee" form
    SELECT * FROM `Employees`
    WHERE `id_employee` = :idInput;
    -- Delete the Employee
    DELETE FROM `Employees`
    WHERE `id_employee` = :idInput;


-- -----------------------------------------------------------------------------
-- CRUD operations for Products table
-- -----------------------------------------------------------------------------

-- Display all Products
SELECT * FROM `Products`;

-- Populate "Add Product" dropdown
SELECT `id_type`, `description` FROM Types; 

-- Insert a Product
INSERT INTO `Products` (`name`, `price`, `stock`, `id_type`)
VALUES (:nameInput, :priceInput, :stockInput, :idTypeInput);

-- Update a Product
    -- Populate the "Update Product" form
    SELECT * FROM `Products` 
    WHERE `id_product` = :idInput;
    -- Update the Product
    UPDATE `Products`
    SET `name` = :nameInput, `price` = :priceInput, `stock` = :stockInput, `id_type` = :idTypeInput
    WHERE `id_product` = :idInput; 

-- Delete a Product
    -- Populate the "Delete Product" form
    SELECT * FROM `Products`
    WHERE `id_product` = :idInput;
    -- Delete the product
    DELETE FROM `Products`
    WHERE `id_product` = :idInput;


-- -----------------------------------------------------------------------------
-- CRUD operations for Types table
-- -----------------------------------------------------------------------------

-- Display all Types
SELECT * FROM `Types`;

-- Add a Type
INSERT INTO `Types` (`description`)
VALUES (:descriptionInput);

-- Update a Type
    -- Populate the "Update Type" form
    SELECT * FROM `Types` 
    WHERE `id_type` = :idInput;
    -- Update the Type
    UPDATE `Types`
    SET `description` = :descriptionInput
    WHERE `id_type` = :idInput;

-- Delete a Type
    -- Populate the "Delete Type" form
    SELECT * FROM `Types`
    WHERE `id_type` = :idInput;
    -- Delete the type
    DELETE FROM `Types`
    WHERE `id_type` = :idInput;


-- -----------------------------------------------------------------------------
-- CRUD operations for Sales and Product_Sales tables
-- -----------------------------------------------------------------------------

-- Display all Sales
SELECT * FROM `Sales`;

-- Display all Product_Sales
SELECT * FROM `Product_Sales`;

-- Display search results
    -- Display Sales table according to search
    SELECT * FROM `Sales`
    WHERE `id_sale` = :idSaleInput;
    -- Display Product_Sales table according to search
    SELECT * FROM `Product_Sales`
    WHERE `id_sale` = :idSaleInput;

-- Insert a Sale
INSERT INTO `Sales` (`date`, `total_price`, `id_customer`, `id_employee`)
VALUES (:dateInput, :priceInput, :idCustomerInput, :idEmployeeInput);

-- Insert a Product_Sale
INSERT INTO `Product_Sales` (`id_product`, `id_sale`)
VALUES (:idProductInput, :idSaleInput);

-- Update a Sale
    -- Populate the "Update Sale" form
    SELECT * FROM `Sales` 
    WHERE `id_sale` = :idSaleInput;
    -- Update the Sale
    UPDATE `Sales`
    SET `date` = :dateInput, `total_price` = :priceInput, `id_customer` = :idCustomerInput, `id_employee` = :idEmployeeInput
    WHERE `id_sale` = :idInput;

-- Update a Product_Sale
    -- Populate the "Update Product_Sales" form
    SELECT * FROM `Product_Sales` 
    WHERE `id_product_sale` = :idInput;
    -- Update the Product_Sale
    UPDATE `Product_Sales`
    SET `id_product` = :idProductInput, `id_sale` = :idSaleInput
    WHERE `id_product_sale` = :idInput;

