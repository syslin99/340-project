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


/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

