// This is the pool.js file for the weekend assignment for week 9 of Prime Digital Academy
// for Adam Boerhave, to make a to do list app, created 10/16/2020 - 10/18/2020

const pg = require('pg');

// pg setup to connect with db
const Pool = pg.Pool;
const pool = new Pool({
    database: process.env.DATABASE_NAME || 'weekend-to-do-app',
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