import mysql from 'mysql';
import dotenv from 'dotenv'
dotenv.config();


const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.getConnection((err) => {
    if (err) throw err;
    console.log('Database Berhasil terkoneksi.');
});

export default connection;