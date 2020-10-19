// This is the tasks_router.js file for the weekend assignment for week 9 of Prime Digital Academy
// for Adam Boerhave, to make a to do list app, created 10/16/2020 - 10/18/2020

// require express
const express = require('express');
const router = express.Router();

// connect to db
const pool = require('../modules/pool');

// GET request to get all tasks from db
// and it puts the incomplete tasks first on the DOM
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks" ORDER BY "complete_status";`;
    
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error in tasks Get request', error);
        res.sendStatus(500);
    });
}); // end GET request

// POST request to take new task in to database
router.post('/', (req, res) => {
    // sends all the input data from DOM to db and I added the value of false for complete_status
    let queryText = `INSERT INTO "tasks"("task_description", "category", "priority", "complete_status")
    VALUES($1, $2, $3, $4);`;
    
    pool.query(queryText, [req.body.task_description, req.body.taskType, req.body.priority, req.body.complete_status]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in tasks POST request', error);
        res.sendStatus(500);     
    });
}); // end POST request

// PUT for changing complete_status to mark task as complete
router.put('/done/:id', (req, res) => {
    console.log('req.body.complete_status', req.body.complete_status);
        // changes complete_status for task to true
        let queryText = `UPDATE "tasks" SET "complete_status" = 'true' WHERE "id" = $1;`;
    
        pool.query(queryText,[req.params.id]).then((result) => {
            console.log('result from PUT', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in PUT request', error);
            res.sendStatus(500);
        });
}); // end complete PUT request

// PUT for changing priority level, takes id from parameter, and data from req.body
router.put('/level/:id', (req, res) => {
    console.log('req.body.direction', req.body.direction);
    let queryText = '';
    if (req.body.direction == '+') {
        queryText = `UPDATE "tasks" SET "priority" = "priority" + 1 WHERE "id" = $1;`
    }
    else if (req.body.direction == '-') {
        queryText = `UPDATE "tasks" SET "priority" = "priority" - 1 WHERE "id" = $1;`
    }
    pool.query(queryText,[req.params.id]).then((result) => {
        console.log('result from PUT', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in PUT request', error);
        res.sendStatus(500);
    });
}); // end PUT for changing priority level 

// DELETE to remove certain database entry for id in parameters
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
}); // end DELETE request

// export
module.exports = router;