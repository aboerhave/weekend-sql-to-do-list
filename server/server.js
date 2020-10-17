// requires
const express = require('express');
const bodyParser = require('body-parser');


// globals
const app = express();
const PORT = 5000;


// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));







app.listen(PORT, () => {
    console.log('server running on port', PORT);    
});