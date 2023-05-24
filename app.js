/* Set up */
// Express
var express = require('express');
var app = express();
PORT = 3024;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');


/* Routes */
app.get('/', function (req, res) {

    let selectTypes = `SELECT * FROM Types;`;
    db.pool.query(selectTypes, function (error, rows, fields) {
        res.render('types', {data: rows});
    });

});

/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

