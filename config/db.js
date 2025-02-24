const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simanting_db'
});

conn.getConnection((err) => {
    if (err) throw err;
    console.log('Database Berhasil terkoneksi.');
});

module.exports = conn;