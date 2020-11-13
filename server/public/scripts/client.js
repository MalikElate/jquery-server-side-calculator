console.log('hello from client'); 

$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from JQuery')
    $('#clear-button').on('click', clearInputs)
    $('#submit-button').on('click', submit)

} 

// function to clear the inputs of the calculator 

// submit sends the data from the inputs to server
function submit() { 
    console.log('submit was clicked'); 
    let first = $('#first-number').val()
    let second = $('#second-number').val()
    // this post sends the data1
    $.ajax({
        method: 'POST', 
        url: '/numbers', 
        data: { 
            firstNumber: first, 
            secondNumber: second 
        }
    }).then( function(response) {
        console.log('recied from server POST:', response)
        // clear inputs 
        clearInputs(); 
    })
}
function clearInputs() { 
    console.log('clear input was clicked') 
    $('.input').val('');
} 