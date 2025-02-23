const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simanting_db'
});

conn.getConnection((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

module.exports = conn;