console.log('hello from client'); 
// global variables
let selectedOperator = ''; 
let first = ''; 
let second =''; 
let sequence = false; 
$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from JQuery');
    // button click events 
    $('#clear-button').on('click', clearInputs);
    $('#enter-div').on('click', submit);
    // operator click events 
    $('#add-div').on('click', () => setOperator('add'));
    $('#subtract-div').on('click', () => setOperator('subtract'))
    $('#multiply-div').on('click', () => setOperator('multiply'))
    $('#divide-div').on('click', () => setOperator('divide'))
} 

// submit sends the data from the inputs to server
function submit() { 
    console.log('submit was clicked'); 
    if ((first === '') || (selectedOperator === '') ) {
        console.log('a value is undefined', first, second, selectedOperator ) 
        return 'a value is undefined, first, second, selectedOperator'
    }
    second = $('#calc-display').val(); 
    console.log(first); 
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
        switchFirstAndSecond(response) 
        clearInputs(response)
    })
} 

function setOperator(num) { 
    if ((num === 'add') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('+ selected') 
        // update selectedOperator 
        selectedOperator = 'plus'; 
      // highlight selected & un-highlight all other buttons
        removeAllElse(selectedOperator);
        storeFirstNumberAndClearInput(first)
    } 
    else if ((num === 'add') && ($('#calc-display').val() !== "") && (first !== '')) { 
        submit();
        second = $('#calc-display').val();
        console.log('+ selected') 
        // update selectedOperator 
        selectedOperator = 'plus'; 
      // highlight selected & un-highlight all other buttons
        removeAllElse(selectedOperator); 
        submit();
        storeFirstNumberAndClearInput(first);
    } 
    else if((num === 'subtract') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        submit(); 
        console.log('- selected'); 
        selectedOperator = 'subtract'; 
        removeAllElse(selectedOperator);
        storeFirstNumberAndClearInput(first);
    } 
    else if((num === 'subtract') && ($('#calc-display').val() !== "") && (first !== '')) { 
        submit();
        second = $('#calc-display').val();
        console.log('- selected');
        selectedOperator = 'subtract'; 
        removeAllElse(selectedOperator); 
        submit();
        storeFirstNumberAndClearInput(first);
    } 
    else if((num === 'multiply') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('* selected'); 
        selectedOperator = 'multiply'; 
        removeAllElse(selectedOperator);
        storeFirstNumberAndClearInput(first);
        } 
    else if((num === 'multiply') && ($('#calc-display').val() !== "") && (first !== '')) { 
        second = $('#calc-display').val();
        console.log('* selected'); 
        selectedOperator = 'multiply'; 
        removeAllElse(selectedOperator);
        submit();
        storeFirstNumberAndClearInput(first);
        } 
    else if((num === 'divide') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('/ selected'); 
        selectedOperator = 'divide'; 
        removeAllElse(selectedOperator);
        storeFirstNumberAndClearInput(first);
        } 
    else if((num === 'divide') && ($('#calc-display').val() !== "") && (first !== '')) { 
        second = $('#calc-display').val();
        console.log('/ selected');
        selectedOperator = 'divide'; 
        removeAllElse(selectedOperator);
        submit();
        storeFirstNumberAndClearInput(first);
        } 
}

// function to clear the inputs of the calculator 
function clearInputs(num) { 
    console.log('inputs cleared') 
    // resets inputs
    $('.calc-display').text(`${num}`); 
    // reset selection 
    $('.operator-button').removeClass('red'); 
    $('.operator-button').addClass('operator-button-color'); 
    selectedOperator = ''; 
    $('#first-number-display').text(`${num}`)
}  

function storeFirstNumberAndClearInput(num) {
    $('#calc-display').val(''); 
    $('#first-number-display').text(`${num}`)
}

function switchFirstAndSecond (num) { 
    first = num; 
    second = ''
}



// this function is responsible for highlighting and un-highlighting the operator divs 
function removeAllElse(item) { 
    if (item === 'plus') {
        $('#add-div').removeClass('operator-button-color')
        $('#add-div').addClass('red') 
        $('#subtract-div').removeClass('red');    
        $('#multiply-div').removeClass('red');
        $('#divide-div').removeClass('red');
        $('#subtract-div').addClass('operator-button-color');
        $('#multiply-div').addClass('operator-button-color');
        $('#divide-div').addClass('operator-button-color');
    }
    else if (item === 'subtract' )  { 
        $('#subtract-div').removeClass('operator-button-color')
        $('#subtract-div').addClass('red') 
        $('#add-div').removeClass('red');
        $('#multiply-div').removeClass('red');
        $('#divide-div').removeClass('red');
        $('#add-div').addClass('operator-button-color');
        $('#multiply-div').addClass('operator-button-color');
        $('#divide-div').addClass('operator-button-color');
    }
    else if (item === 'multiply' )  { 
        $('#multiply-div').removeClass('operator-button-color')
        $('#multiply-div').addClass('red') 
        $('#subtract-div').removeClass('red');
        $('#add-div').removeClass('red');
        $('#divide-div').removeClass('red');
        $('#add-div').addClass('operator-button-color');
        $('#subtract-div').addClass('operator-button-color');
        $('#divide-div').addClass('operator-button-color');
    }
    else if (item === 'divide' )  {
        $('#divide-div').removeClass('operator-button-color')
        $('#divide-div').addClass('red') 
        $('#subtract-div').removeClass('red');
        $('#multiply-div').removeClass('red');
        $('#add-div').removeClass('red');
        $('#add-div').addClass('operator-button-color');
        $('#subtract-div').addClass('operator-button-color');
        $('#multiply-div').addClass('operator-button-color');
    } 
} 
