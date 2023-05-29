/* Set up */

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT = 3030;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');


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
    res.render('products');
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
    res.render('sales');
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



/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

