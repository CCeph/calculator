//Setting default values for the calculator.
let num1 = undefined;
let operator = undefined;
let num2 = undefined;
let activeResult = undefined;

//The functions add, subtract, multiply, divide, and operate are
//responsible for the mathematical logic of the calculator.

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        
        default:
            console.log("Error in 'operate' function logic.")
    }
}

//This function adds interactivity with the GUI calc buttons.
function addButtonInteractivity() {
    digits = document.querySelectorAll('.digit');
    digits.forEach(digit => {
        digit.addEventListener('click', updateNum);
    });

    //Another event listener for operators required
    operators = document.querySelectorAll('.operator')
    operators.forEach(operateSign => {
        operateSign.addEventListener('click', updateOperator)
    });

    //Another event listener for equals
    equalButton = document.querySelector('#equals');
    equalButton.addEventListener('click', performEqualsCalc)

    //Another event listener for AC
    clearButton = document.querySelector('#AC');
    clearButton.addEventListener('click', clear);
    
}

//This function is called when a number button is pressed.
function updateNum() {
    if (!(activeResult === undefined)) {
        clear();
        let reset = true;
        updateOperatorDisplay(reset);
    }

    if (operator === undefined) {
        num1 === undefined ? num1 = this.id : num1 += this.id
    } else {
        num2 === undefined ? num2 = this.id : num2 += this.id
    }
    updateNumDisplay();
}

//This function updates the display of the calculator when a number button is pressed.
function updateNumDisplay(reset) {
    let currentNumber = document.querySelector(".bottomDisplay");

    if (reset === true) {
        currentNumber.textContent = ' ';
        return;
    }

    if (operator === undefined) {
        currentNumber.textContent = `${num1}`
    } else {
        currentNumber.textContent = `${num2}`
    }
}

//This function is called when an operator button is pressed. It is supposed to update
//the operator in the script and call the necessary functions to handle the
//logic or display.
function updateOperator() {
    if (!(operator === undefined) && !(num2 === undefined)) {
        /*performOperatorCalc will conduct the operation.
        errorStatus is a variable used as a flag for validation.*/
        let errorStatus = performOperatorCalc();

        //This checks if the calculation returned an error
        //and hence it needs to break.
        if (errorStatus === true) {
            return;
        }
    }
    operator = this.id;
    updateOperatorDisplay();
}

//This function performs the calculation and displays the result if an operator button
//is pressed when num1, operator, and num2 are all present.
function performOperatorCalc() {
    //Handles the case of anything divided by 0
    if (operator === "/" && num2 === "0") {
        triggerMathError();
        displayMathError();
        return true;
    }

    let result = operate(parseInt(num1), operator, parseInt(num2));
    let currentEquation = document.querySelector(".topDisplay");
    let currentNumber = document.querySelector('.bottomDisplay');
    currentEquation.textContent = `${result} ${operator}`
    currentNumber.textContent = `${result}`
    num1 = result;
    num2 = undefined;
    return false;
}

//This function updates the display with the selected operator.
function updateOperatorDisplay(reset) {
    let currentEquation = document.querySelector(".topDisplay");

    if (reset === true) {
        currentEquation.textContent = ` `;
        return;
    }

    currentEquation.textContent = `${num1} ${operator}`;
}

//This function performs the calculation and presents the result when equals is pressed.
function performEqualsCalc() {
    //Handles the case of anything divided by 0
    if (operator === "/" && num2 === "0") {
        triggerMathError();
        displayMathError();
        return;
    }
    
    if ((operator === undefined) || (num2 === undefined)) {
        console.log("Error in performEquals");
        return;
    }
    
    let result = operate(parseInt(num1), operator, parseInt(num2));
    let currentEquation = document.querySelector(".topDisplay");
    let currentNumber = document.querySelector('.bottomDisplay');
    currentEquation.textContent = `${num1} ${operator} ${num2} =`
    currentNumber.textContent = `${result}`
    activeResult = result
}

//This function resets the calculator.
function clear() {
    num1 = undefined;
    operator = undefined;
    num2 = undefined;
    activeResult = undefined;
    let reset = true;

    updateNumDisplay(reset);
    updateOperatorDisplay(reset);
}

//This function will trigger a math error in the calculator by setting num1, operator
//and num2 to "mathError".
function triggerMathError() {
    num1 = undefined;
    operator = undefined;
    num2 = undefined;
}

//This function will display the Math Error message on the calculator.
function displayMathError() {
    let topDisplay = document.querySelector(".topDisplay");
    let bottomDisplay = document.querySelector('.bottomDisplay');
    topDisplay.textContent = ``
    bottomDisplay.textContent = `Math Error`
}

addButtonInteractivity();