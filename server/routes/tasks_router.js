const express = require('express');
const router = express.Router();

// connect to db
const pool = require('../modules/pool');

// GET request to get all tasks
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks";`;

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error in tasks Get request', error);
        res.sendStatus(500);
    });
});







// POST request to take new task in to database






// PUT for changing complete_status







// DELETE to remove certain row








// export
module.exports = router;