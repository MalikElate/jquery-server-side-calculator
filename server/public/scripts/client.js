console.log('hello from client'); 
// global variables
let selectedOperator = ''; 
let first = ''; 
let second =''; 
$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from JQuery');
    // button click events 
    $('#enter-div').on('click', submit);
    $('#clear-div').on('click', clearInputs);
    $('#clear-all-div').on('click', clearAll);
    // operator click events 
    $('#add-div').on('click', () => setOperator('add'));
    $('#subtract-div').on('click', () => setOperator('subtract'))
    $('#multiply-div').on('click', () => setOperator('multiply'))
    $('#divide-div').on('click', () => setOperator('divide')) 
    // number click event 
    $('.btn-div-ex0').on('click', keyBoard) 
    $('#btn-0-div').on('click', keyBoard) 
    // history click events 
    $('#btn-log-clear').on('click', clearLogs); 
    $('#btn-log-clear').mouseenter( handlerIn ).mouseleave( handlerOut ); 
    $('#table-row').on('click', '#log-calc-btn', reCalc); 
    // keep log updated after refresh 
    getResults() 
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

// keyBoard gives functionality to the number divs
function keyBoard() { 
    $('#calc-display').val($('#calc-display').val() + $(this).text()) ;
} 

function getResults() { 
    // Making a GET request to our server
    // this returns back a 'Promise' 
    $.ajax({
        method: 'GET', 
        url: '/numbers'
    }).then(function(response){ 
        console.log('Got response', response); 
        renderResults(response)
        switchFirstAndSecond(response[response.length -1].answer); 
    }) 
    clearInputs();
} 
// function to clear the inputs of the calculator 
function clearInputs() { 
    console.log('inputs cleared') 
    // resets inputs
    $('#calc-display').val(''); 
    // reset selection 
    $('.operator-button').removeClass('red'); 
    $('.operator-button').addClass('operator-button-color');  
    selectedOperator = ""; 
}  

// clears all inputs and selected operators
function clearAll() { 
    console.log('cleared All')
    clearInputs();
    $('#first-number-display').text(`******`);
    first = ""; 
    second =""
}

// automatically set the answer to first number for faster calculating 
function switchFirstAndSecond (num) { 
    first = num; 
    second = '';
    trackNumbers('switchFirstAndSecond')
} 

// log all past calculations and set the first number display
function renderResults(num) {
    $('#first-number-display').text(`${num[num.length -1].answer}`); 
    $('#table-row').empty(); 
    for (let i=num.length-1; i>=0; i--) {
        $('#table-row').append(` 
        <tr>
            <td>${(num.length - i)}</td> 
            <td>${num[i].first}</td>
            <td>${num[i].operator}</td>
            <td>${num[i].second}</td>
            <td>${num[i].answer}</td> 
            <td><button id="log-calc-btn">calculate</button></td> 
        <tr>`
        );
    } 
    $('#log-calc-btn').mouseenter( handlerIn ).mouseleave( handlerOut );
} 

// Clear all logs
function clearLogs() { 
    console.log('clearLogs was called')
    $.ajax({
        method: 'DELETE', 
        url: '/numbers'
    }).then(function(response){
        console.log(response); 
        $('#table-row').empty(); 
    }) 
}

// on hover, highligh buttons orange 
function handlerIn() { 
    $(this).addClass('red');
}
function handlerOut() { 
    $(this).removeClass('red');
} 

// 
function reCalc() { 
    first = ($(this).parent().siblings().eq(1).text());
    console.log(`first = ${$(this).parent().siblings().eq(1).text()}`);
    second = ($(this).parent().siblings().eq(4).text());
    storeFirstNumberAndClearInput(); 
    $('#calc-display').val(`${second}`); 
    setOperator($(this).parent().siblings().eq(2).text()); 
    window.scrollTo(0, 0);
}

// this function selects the operator 
function setOperator(num) { 
    //////////////////// ADDITION define first number //////////////////////////////////////////////
    if (($('#calc-display').val() == "") && (first === '')) { 
        return 'cant select operator'
    }
    else if ((num === 'add') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('+ selected') 
        // update selectedOperator 
        selectedOperator = 'plus'; 
      // highlight selected & un-highlight all other buttons
        removeAllElse(selectedOperator);
        storeFirstNumberAndClearInput(first)
    }
    // ADDITION define second number
    else if ((num === 'add') && ($('#calc-display').val() !== "") && (first !== '')) {  
        second = $('#calc-display').val();
        console.log('+ selected') 
        // update selectedOperator 
        selectedOperator = 'plus'; 
      // highlight selected & un-highlight all other buttons
        removeAllElse(selectedOperator); 
    } 
    //////////////////// SUBTRACTION define first number //////////////////////////////////////////////
    else if((num === 'subtract') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('- selected'); 
        selectedOperator = 'subtract'; 
        removeAllElse(selectedOperator); 
        storeFirstNumberAndClearInput()
    } 
    // SUBTRACTION define second number
    else if((num === 'subtract') && ($('#calc-display').val() !== "") && (first !== '') ) { 
        second = $('#calc-display').val();
        console.log('- selected');
        selectedOperator = 'subtract'; 
        removeAllElse(selectedOperator); 
    } 
    //////////////////// MULTIPLICATION define first number ////////////////////////////////////////////// 
    else if((num === 'multiply') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('* selected'); 
        selectedOperator = 'multiply'; 
        removeAllElse(selectedOperator); 
        storeFirstNumberAndClearInput()
        } 
    // MULTIPLICATION define second number
    else if((num === 'multiply') && ($('#calc-display').val() !== "") && (first !== '')) { 
        second = $('#calc-display').val();
        console.log('* selected');
        selectedOperator = 'multiply'; 
        removeAllElse(selectedOperator);
        } 
    //////////////////// DIVISION define first number //////////////////////////////////////////////
    else if((num === 'divide') && ($('#calc-display').val() !== "") && (first === '')) { 
        first = $('#calc-display').val();
        console.log('/ selected'); 
        selectedOperator = 'divide'; 
        removeAllElse(selectedOperator); 
        storeFirstNumberAndClearInput()
        } 
    // DIVISION define second number
    else if((num === 'divide') && ($('#calc-display').val() !== "") && (first !== '')) { 
        second = $('#calc-display').val();
        console.log('/ selected');
        selectedOperator = 'divide'; 
        removeAllElse(selectedOperator);
        } 
}

function storeFirstNumberAndClearInput() { 
    $('#first-number-display').text(`${first}`) 
    $('#calc-display').val(''); 
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
