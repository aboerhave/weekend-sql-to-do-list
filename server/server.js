// This is the server file for the weekend assignment for week 9 of Prime Digital Academy
// for Adam Boerhave, to make a to do list app, created 10/16/2020 - 10/18/2020

// requires
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks_router');

// globals
const app = express();
const PORT = 5000;


// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// routes
// all the routes go through /tasks, so there is only one route here
app.use('/tasks', taskRouter);

// listen
app.listen(PORT, () => {
    console.log('server running on port', PORT);    
});