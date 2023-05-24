/* Set up */
var express = require('express');
var app = express();
PORT = 3024;

/* Routes */
app.get('/', function (req, res) {
    res.send('The server is running!')
});

/* Listener */
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

