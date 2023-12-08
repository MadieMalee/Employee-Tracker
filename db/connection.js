const mysql = require('mysql2');
require('dotenv').config();

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER_ID,
    password: process.env.PASSWORD,
    database: 'employee_db'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

module.exports = connection;