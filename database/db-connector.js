var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_linsam',
    password        : '3024',
    database        : 'cs340_linsam'
});


module.exports.pool = pool;
