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
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');


/* Routes */

// Render Types page
app.get('/', function (req, res) {

    let selectTypes = `SELECT * FROM Types;`;
    db.pool.query(selectTypes, function (error, rows, fields) {
        res.render('types', {data: rows});
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


/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

