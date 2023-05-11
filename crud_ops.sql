-- Inputs from website files are given the syntax: --
--               xxxx_input                      -- 

------------- Products.html -------------
--             SQL Queries             --
-----------------------------------------

-- Display initial table for Products page
SELECT * FROM Products;

-- Populate "Add Product" dropdown
SELECT id_type, description FROM Types; 

-- Insert a Product into the Products table
INSERT INTO Products (name, price, stock, id_type)
VALUES (name_input, price_input, stock_input, id_type_input);

-- Updating a Product from the Products table

    -- Populate the "Update Product" fields
    SELECT name, price, stock, id_type FROM Products 
    WHERE id_product = id_product_input;

    -- Update the Product
    UPDATE Products SET
    name = name_input, price = price_input, id_type = id_type_input
    WHERE id_product = id_product_input; 

-- Deleting a Product from the Products table

    -- Populate the "Delete Product" fields
    SELECT * FROM Products WHERE id_product = id_product_input;

    -- Delete the product
    DELETE FROM Products WHERE id_product = id_product_input;

------------- Types.html -------------
--            SQL Queries           --
--------------------------------------

-- Display initial table for Types page
SELECT * FROM Types;

-- Add new type to Types table
INSERT INTO Types (description)
VALUES (description_input);

-- Update a type from Types table
    -- Populate the "Update Type" fields
    SELECT description FROM Types 
    WHERE id_type = id_type_input;

    -- Update the type
    UPDATE Types SET
    description = description_input
    WHERE id_type = id_type_input;

-- Delete a type from Types table
    -- Populate the "Delete Type" fields
    SELECT * FROM Types WHERE id_type = id_type_input;
    
    -- Delete the type
    DELETE FROM Types WHERE id_type = id_type_input;

------------- Sales.html -------------
--            SQL Queries           --
--------------------------------------

-- Display initial table for Sales page
SELECT * FROM Sales;

-- Display initial table for Product_Sales
SELECT * FROM Product_Sales;

-- Display search results
    -- Display Sales table according to search
    SELECT * FROM Sales WHERE id_sale = id_sale_input;

    -- Display Product_Sales table according to search
    SELECT * FROM Product_Sales WHERE id_sale = id_sale_input;

-- Add new sale to Sales table
INSERT INTO Sales (date, total_price, id_customer, id_employee)
VALUES (date_input, total_price_input, id_customer_input, id_employee_input);

-- Add new product_sale to Product_Sales table
INSERT INTO Product_Sales (id_product, id_sale)
VALUES (id_product_input, id_sale_input)

-- Update a sale from Sales table
    -- Populate the "Update Sale" fields
    SELECT date, total_price, id_customer, id_employee FROM Sales 
    WHERE id_sale = id_sale_input;

    -- Update the Sale
    UPDATE Sales SET
    date = date_input, total_price = total_price_input, id_customer = id_customer_input, id_employee = id_employee_input
    WHERE id_type = id_type_input;

-- Update a product_sale from Product_Sales table
    -- Populate the "Update Product_Sales" field
    SELECT id_product, id_sale FROM Product_Sales 
    WHERE id_product_sale = id_product_sale_input;

    -- Update the product_sale
    UPDATE Product_Sales SET
    id_product = id_product_input, id_sale = id_sale_input
    WHERE id_product_sale = id_product_sale_input;
