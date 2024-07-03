// Require the mysql2 package
import mysql from 'mysql'


// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: '8817', // Replace with your MySQL password
    database: 'csit', // Replace with your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Execute a query
pool.query('SELECT * from adminlogin', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

// Close the pool
//pool.end();
