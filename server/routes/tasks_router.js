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
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "tasks"("task_description", "complete_status")
    VALUES($1, $2);`;

    pool.query(queryText, [req.body.task_description, req.body.complete_status]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in tasks POST request', error);
        res.sendStatus(500);     
    });
});





// PUT for changing complete_status
router.put('/:id', (req, res) => {
    console.log('req.body.complete_status', req.body.complete_status);
    
        let queryText = `UPDATE "tasks" SET "complete_status" = 'true' WHERE "id" = $1;`;
    
        pool.query(queryText,[req.params.id]).then((result) => {
            console.log('result from PUT', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in PUT request', error);
            res.sendStatus(500);
        });
});






// DELETE to remove certain row
router.delete('/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('success', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in DELETE request', error);
        res.sendStatus(500);        
    });
});







// export
module.exports = router;