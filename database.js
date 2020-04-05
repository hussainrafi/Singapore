const { Pool } = require ('pg');
const pool = new Pool({
    host: 'localhost' ,
    port: 5432,
    user: 'test' ,
    database: 'test' ,
    password: 'test' ,
})
module.exports = pool;


