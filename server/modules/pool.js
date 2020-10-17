const pg = require('pg');

// pg setup to connect with db
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

pool.on('connect', () => {
    console.log('Postgresql connected');    
});

pool.on('error', (error) => {
    console.log('error with Postgresql pool', error);    
});

module.exports = pool;