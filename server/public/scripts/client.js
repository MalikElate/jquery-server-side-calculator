console.log('hello from client'); 
// global variables
let selectedOperator = ''; 

$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from JQuery');
    // button click events 
    $('#clear-button').on('click', clearInputs);
    $('#submit-button').on('click', submit);
    // operator click events 
    $('#add-button').on('click', () => setOperator('add'));
    $('#subtract-button').on('click', () => setOperator('subtract'))
    $('#multiply-button').on('click', () => setOperator('multiply'))
    $('#divide-button').on('click', () => setOperator('divide'))
} 

// submit sends the data from the inputs to server
function submit() { 
    console.log('submit was clicked'); 
    let first = $('#first-number').val();
    console.log(first); 
    let second = $('#second-number').val(); 
    console.log(second); 
    // this post sends the data1
    $.ajax({
        method: 'POST', 
        url: '/numbers', 
        data: { 
            firstNumber: first, 
            secondNumber: second, 
            operator: selectedOperator
        }
    }).then( function(response) {
        console.log('received from server POST:')
        
        getResults()
        // clear inputs 
        clearInputs(); 
    })
} 


function getResults() { 
    // Making a GET request to our server
    // this returns back a 'Promise' 
    $.ajax({
        method: 'GET', 
        url: '/numbers'
    }).then(function(response){
        console.log('Got response', response); 
        renderPage(response); 
    })
    
    console.log(`end of get Results`);
} 

function renderPage(input) { 
    console.log(input)
}

function setOperator(num) { 
    if (num === 'add') { 
        console.log('+ selected') 
        // update selectedOperator 
        selectedOperator = 'plus'; 
        // highlight selected 
        $('#add-button').addClass('red') 
        // un-highlight all other buttons
        removeAllElse(selectedOperator); 
    } 
    else if(num === 'subtract') {
        console.log('- selected') 
        $('#subtract-button').addClass('red') 
        selectedOperator = 'subtract'
        removeAllElse(selectedOperator);
    } 
    else if (num === 'multiply') {
        console.log('* selected') 
        $('#multiply-button').addClass('red') 
        selectedOperator = 'multiply'
        removeAllElse(selectedOperator);
    } 
    else if(num === 'divide') {
        console.log('/ selected') 
        $('#divide-button').addClass('red') 
        selectedOperator = 'divide'
        removeAllElse(selectedOperator);
    }
}

// function to clear the inputs of the calculator 
function clearInputs() { 
    console.log('inputs cleared') 
    // resets inputs
    $('.input').val(''); 
    // reset selection 
    $('.operator-button').removeClass('red'); 
    selectedOperator = ''; 
}  

function removeAllElse(item) { 
    if (item === 'plus' )  {
        $('#subtract-button').removeClass('red');
        $('#multiply-button').removeClass('red');
        $('#divide-button').removeClass('red');
    }
    else if (item === 'subtract' )  {
        $('#add-button').removeClass('red');
        $('#multiply-button').removeClass('red');
        $('#divide-button').removeClass('red');
    }
    else if (item === 'multiply' )  {
        $('#subtract-button').removeClass('red');
        $('#add-button').removeClass('red');
        $('#divide-button').removeClass('red');
    }
    else if (item === 'divide' )  {
        $('#subtract-button').removeClass('red');
        $('#multiply-button').removeClass('red');
        $('#add-button').removeClass('red');
    } 
    else { 
        console.log('error deselecting colors')
    }
}