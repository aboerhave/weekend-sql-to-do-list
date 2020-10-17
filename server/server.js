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
app.use('/tasks', taskRouter);





app.listen(PORT, () => {
    console.log('server running on port', PORT);    
});