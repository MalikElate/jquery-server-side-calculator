// Bring in express, from the node_modules directory express is a function
const express = require('express');

// Bring in the bodyParse function 
const bodyParser = require('body-parser');

// create an instance of the express web server
const app = express();

// set port value
const port = 5000; 

// Tell express where to find static files that it can send on request
app.use( express.static('server/public') );

// Tell express how to parse incoming data 
app.use( bodyParser.urlencoded( {extended: true} ) );

// ----------- These routes will vary for each assignment -----------
app.post('/numbers', (req, res) => {  
    let data = req.body; 
    console.log('Post: getting numbers data...,', data); 
    res.sendStatus(200) // 200 is an OK status 
});
//-----------------------End of routes ---------------------------

// Tell our server to start listening for requests on our port
app.listen( port, () => {
  console.log(`Server is listening on port ${port}...`);
})