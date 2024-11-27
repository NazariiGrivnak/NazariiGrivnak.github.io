const mysql = require('mysql');

// Set database connection credentials
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api'
});

// Export the pool
module.exports = pool;


// Load the MySQL pool connection
const pool = require('config.js');

const router = app => {
    app.get('/', (reqaest, response) => {
        response.send({
            massege: 'Node.js and Express REST API'
        });
    });

    app.get('/users', (reqaest, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });
}
