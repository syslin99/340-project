/* Set up */

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT = 3024;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
const { resetColumns } = require('forever/lib/forever/cli');
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
var hbs = exphbs.create({});
hbs.handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


/* Routes */

// Render Home page
app.get('/', function (req, res) {
    res.render('index');
});

// Render Employees page
app.get('/employees', function (req, res) {
    let selectEmployees = `SELECT * FROM Employees;`
    db.pool.query(selectEmployees, function (error, rows, fields) {
        res.render('employees', {data: rows})
    })

});

// Render Customers page
app.get('/customers', function (req, res) {
    let selectCustomers = `SELECT * FROM Customers;`;
    db.pool.query(selectCustomers, function (error, rows, fields) {
        res.render('customers', {data: rows});
    });
});

// Render Products page
app.get('/products', function (req, res) {

    // Display products
    let selectProducts = `SELECT * FROM Products;`;
    db.pool.query(selectProducts, function (error, rows, fields) {
        let products = rows;

        // Use type description instead of FK
        let selectTypes = `SELECT * FROM Types;`;
        db.pool.query(selectTypes, function (error, rows, fields) {
            let types = rows;

            // Create map reference for displaying type in products table
            let typemap = {};
            types.map(type => {
                let id = parseInt(type.id_type, 10);
                typemap[id] = type['description'];
            });
            // Add type description
            products = products.map(product => {
                return Object.assign(product, {type: typemap[product.id_type]})
            });
            return res.render('products', {data: products, types: types})
        });
    });
});

// Render Types page
app.get('/types', function (req, res) {

    let selectTypes = `SELECT * FROM Types;`;
    db.pool.query(selectTypes, function (error, rows, fields) {
        res.render('types', {data: rows});
    });

});

// Render Sales page
app.get('/sales', function (req, res) {

    let selectSales;
    let selectProductSales;
    let resultPhrase; 
    // Show all Sales
    if (req.query.sale === undefined || req.query.sale === '') {
        selectSales = `SELECT id_sale, DATE_FORMAT(date, '%Y-%m-%d') AS date, total_price, id_customer, id_employee
            FROM Sales;`;
        selectProductSales = `SELECT * FROM Product_Sales;`;
        resultPhrase = '';
    }
    // Show search results
    else {
        selectSales = `SELECT id_sale, DATE_FORMAT(date, '%Y-%m-%d') AS date, total_price, id_customer, id_employee
            FROM Sales
            WHERE id_sale LIKE '${req.query.sale}%';`;
        selectProductSales = `SELECT * FROM Product_Sales
            WHERE id_sale LIKE '${req.query.sale}%';`;
        resultPhrase = `Results for id_sale ${req.query.sale}`;
    }


    // Display Sales
    db.pool.query(selectSales, function(error, rows, fields) {
        let sales = rows;

        // Use customer name instead of FK
        let selectCustomers = `SELECT * FROM Customers;`;
        db.pool.query(selectCustomers, function(error, rows, fields) {
            let customers = rows;
            // Create map reference for displaying customer in sales table
            let customermap = {};
            customers.map(customer => {
                let id = parseInt(customer.id_customer, 10);
                customermap[id] = customer['name'];
            });
            // Add customer name
            sales = sales.map(sale => {
                return Object.assign(sale, {customer: customermap[sale.id_customer]})
            });

            // Use employee name instead of FK
            let selectEmployees = `SELECT * FROM Employees;`;
            db.pool.query(selectEmployees, function(error, rows, fields) {
                let employees = rows;
                // Create map reference for dispaying employee in sales table
                let employeemap = {};
                employees.map(employee => {
                    let id = parseInt(employee.id_employee, 10);
                    employeemap[id] = employee['name'];
                });
                // Add employee name
                sales = sales.map(sale => {
                    return Object.assign(sale, {employee: employeemap[sale.id_employee]})
                });


                // Display Product Sales
                db.pool.query(selectProductSales, function(error, rows, fields) {
                    let productsales = rows;

                    // Use product name instead of FK
                    let selectProducts = `SELECT * FROM Products;`;
                    db.pool.query(selectProducts, function(error, rows, fields) {
                        let products = rows;
                        // Create map reference for displaying product in product_sales table
                        let productmap = {};
                        products.map(product => {
                            let id = parseInt(product.id_product, 10);
                            productmap[id] = product['name'];
                        });
                        // Add product name
                        productsales = productsales.map(productsale => {
                            return Object.assign(productsale, {product: productmap[productsale.id_product]})
                        });

                        return res.render('sales', {resultPhrase: resultPhrase, salesData: sales, productsalesData: productsales, customers: customers, employees: employees, products: products})
                    });
                });

            });
        });
    });

});

// Submit Add Type form
app.post('/add-type', function (req, res) {

    // Capture incoming data
    let data = req.body;

    // Add type
    addTypes = `INSERT INTO Types (description)
        VALUES ('${data.description}');`;
    db.pool.query(addTypes, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            selectTypes = `SELECT * FROM Types;`;
            db.pool.query(selectTypes, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});

// Delete a Type
app.delete('/delete-type', function (req, res, next) {
    let data = req.body;
    let typeID = parseInt(data.id_type);

    let deleteType = `DELETE FROM Types
        WHERE id_type = ?;`;
    db.pool.query(deleteType, [typeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Update a Type
app.put('/update-type', function (req, res, next) {
    let data = req.body;
    let typeID = parseInt(data.id_type);
    let description = data.description;

    let updateType = `UPDATE Types
        SET description = ?
        WHERE id_type = ?;`;
    db.pool.query(updateType, [description, typeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let selectType = `SELECT * FROM Types
                WHERE id_type = ?;`;
            db.pool.query(selectType, [typeID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    })

});


/* -------------- Customers -------------- */

// Submit Add Customer form
app.post('/add-customer', function (req, res) {

    // Capture incoming data
    let data = req.body;

    // Add Customer
    addCustomers = `INSERT INTO Customers (name, email)
        VALUES ('${data.name}', '${data.email}');`;
    db.pool.query(addCustomers, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            selectCustomers = `SELECT * FROM Customers;`;
            db.pool.query(selectCustomers, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});

// Delete a Customer
app.delete('/delete-customer', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id_customer);
    let deleteCustomer = `DELETE FROM Customers
    WHERE id_customer = ?;`;
    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Update a Customer
app.put('/update-customer', function (req, res, next) {
    let data = req.body
    let customerID = parseInt(data.id_customer)
    let name = data.name
    let email = data.email

    let updateCustomer = `UPDATE Customers
        SET name = '${name}', email = '${email}'
        WHERE id_customer = '${customerID}';`
    db.pool.query(updateCustomer, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            let selectCustomer = `SELECT * FROM Customers
                WHERE id_customer = ?;`
            db.pool.query(selectCustomer, [customerID], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })

});

/* -------------- Employees -------------- */

// Submit Add Employee form
app.post('/add-employee', function (req, res) {

    // Capture incoming data
    let data = req.body;

    // Add Employee
    addEmployees = `INSERT INTO Employees (name, hourly_rate, hours_worked, total_sales)
        VALUES ('${data.name}', '${data.hourly_rate}', '${data.hours_worked}', '${data.total_sales}');`;
    db.pool.query(addEmployees, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            selectEmployees = `SELECT * FROM Employees;`;
            db.pool.query(selectEmployees, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});

// Delete an Employee
app.delete('/delete-employee', function (req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id_employee);
    let deleteEmployee = `DELETE FROM Employees
    WHERE id_employee = ?;`;
    db.pool.query(deleteEmployee, [employeeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Update an Employee
app.put('/update-employee', function (req, res, next) {
    let data = req.body
    let employeeID = parseInt(data.id_employee)
    let name = data.name
    let rate = data.hourly_rate
    let hours = data.hours_worked
    let sales = data.total_sales

    let updateEmployee = `UPDATE Employees
        SET name = '${name}', hourly_rate = '${rate}', hours_worked = '${hours}', total_sales = '${sales}'
        WHERE id_employee = '${employeeID}';`
    db.pool.query(updateEmployee, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            let selectEmployee = `SELECT * FROM Employees
                WHERE id_employee = ?;`
            db.pool.query(selectEmployee, [employeeID], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })
});

/* -------------- Products -------------- */

// Submit Add Product Form
app.post('/add-product', function (req, res) {

    // Capture incoming data
    let data = req.body;
    // Capture NULL values
    let stock = parseInt(data.stock);
    if (isNaN(stock)) {
        stock = 0;
    }

    // Add product to database
    addProduct = `INSERT INTO Products (name, price, stock, id_type)
        VALUES ('${data.name}', ${data.price}, ${stock}, ${data.id_type});`;
    db.pool.query(addProduct, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Display newly added product
            selectProducts = `SELECT id_product, name, price, stock, description as type
                FROM Products
                JOIN Types ON Products.id_type = Types.id_type;`;
            db.pool.query(selectProducts, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});

// Submit Update Product Form
app.put('/update-product', function (req, res, next) {

    // Capture incoming data
    let data = req.body;
    let productID = parseInt(data.id_product);

    // Update product in database
    updateProduct = `UPDATE Products
        SET name = '${data.name}', price = ${data.price}, stock = ${data.stock}, id_type = ${data.id_type}
        WHERE id_product = ${productID};`;
    db.pool.query(updateProduct, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Display newly updated product
            selectProduct = `SELECT id_product, name, price, stock, description as type
                FROM Products
                JOIN Types ON Products.id_type = Types.id_type
                WHERE id_product = ?;`;
            db.pool.query(selectProduct, [productID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});

// Submit Delete Product Form
app.delete('/delete-product', function (req, res, next) {
    
    // Capture incoming data
    let data = req.body;
    let productID = parseInt(data.id_product);

    // Delete product from database
    deleteProduct = `DELETE FROM Products
        WHERE id_product = ?;`;
    db.pool.query(deleteProduct, [productID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });

});

/* -------------- Sales -------------- */

// Submit Add Sale Form
app.post('/add-sale', function(req, res) {

    // Capture incoming data
    let data = req.body;
    let saleData = data[0];
    let productSaleData = data[1];
    
    // Add sale to database
    addSale = `INSERT INTO Sales (date, total_price, id_customer, id_employee)
        VALUES ('${saleData.date}', ${saleData.total_price}, ${saleData.id_customer}, ${saleData.id_employee});`;
    db.pool.query(addSale, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Display newly added sale
            selectSales = `SELECT id_sale, DATE_FORMAT(date, '%Y-%m-%d') AS date, total_price, Customers.name as customer, Employees.name as employee
                FROM Sales
                JOIN Customers ON Sales.id_customer = Customers.id_customer
                JOIN Employees ON Sales.id_employee = Employees.id_employee
                ORDER BY id_sale;`;
            db.pool.query(selectSales, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    let sales = rows;

                    // Retrieve id_sale
                    getSaleID = `SELECT MAX(id_sale) AS id FROM Sales;`;
                    db.pool.query(getSaleID, function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            saleID = rows[0].id;
                            let productsales = [];

                            // Add product sales to database
                            for (let i = 0, ps; ps = productSaleData[i]; i++) {
                                addProductSale = `INSERT INTO Product_Sales (id_sale, id_product, quantity)
                                    VALUES (${saleID}, ${productSaleData[i].id_product}, ${productSaleData[i].quantity});`;
                                db.pool.query(addProductSale, function(error, rows, fields) {
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(400);
                                    } else {
                                        productsales.push(rows);

                                        // Display newly added product sales
                                        if (productsales.length == productSaleData.length) {
                                            selectProductSales = `SELECT id_product_sale, id_sale, name, quantity
                                                FROM Product_Sales
                                                JOIN Products ON Product_Sales.id_product = Products.id_product
                                                ORDER BY id_product_sale;`;
                                            db.pool.query(selectProductSales, function(error, rows, fields) {
                                                if (error) {
                                                    console.log(error);
                                                    res.sendStatus(400);
                                                } else {
                                                    res.send([sales, rows]);
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                        }
                    });

                }
            });
        }
    });

});

// Submit Update Sale Form
app.put('/update-sale', function(req,res) {

    // Capture incoming data
    let data = req.body;
    let saleID = parseInt(data.id_sale);

    // Update sale in database
    updateSale = `UPDATE Sales
        SET date = '${data.date}', total_price = ${data.total_price}, id_customer = ${data.id_customer}, id_employee = ${data.id_employee}
        WHERE id_sale = ${saleID};`;
    db.pool.query(updateSale, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Display newly updated sale
            selectSale = `SELECT id_sale, DATE_FORMAT(date, '%Y-%m-%d') AS date, total_price, Customers.name as customer, Employees.name as employee
                FROM Sales
                JOIN Customers ON Sales.id_customer = Customers.id_customer
                JOIN Employees ON Sales.id_employee = Employees.id_employee
                WHERE id_sale = ?;`;
            db.pool.query(selectSale, [saleID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });

});


/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

