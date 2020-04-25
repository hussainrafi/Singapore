const { Pool, Client } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5434,
    user: 'postgres',
    database: 'myDB',
    password: 'karakus',
});
module.exports = pool;

pool.query('SELECT NOW()').then(result => {
    console.log(result.rows)
    pool.end()
});
