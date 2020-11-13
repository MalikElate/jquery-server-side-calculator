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


//////////////////////////////////// calculator /////////////////////////////////////////
let answer = 0; 
let arrayAnswer = []; 
function calculator(num1, num2, op) { 
    if (op === 'plus') { 
        answer = num1/1 + num2/1
    } 
    else if (op === 'subtract') {
        answer = num1 - num2
    }
    else if (op === 'multiply') {
        answer = num1 * num2
    }
    else if (op === 'divide') {
        answer = num1 / num2
    } 
    arrayAnswer = []; 
    arrayAnswer.push(answer)
}





// ----------- These routes will vary for each assignment -----------
app.get('/numbers', (req, res) => { 
    console.log('sending answer ...'); 
    res.send(arrayAnswer); 
    console.log('sending answer 22222 ...'); 
})  

app.post('/numbers', (req, res) => {  
    let data = req.body 
    let first = req.body.firstNumber 
    let second = req.body.secondNumber 
    let operator = req.body.operator  
    calculator(first, second, operator);
    console.log('Post: getting numbers data...,', data); 
    res.sendStatus(200) // 200 is an OK status 
});
//-----------------------End of routes ---------------------------

// Tell our server to start listening for requests on our port
app.listen( port, () => {
  console.log(`Server is listening on port ${port}...`);
}) 

