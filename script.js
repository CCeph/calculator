//Setting default values for the calculator.
let num1 = undefined;
let operator = undefined;
let num2 = undefined;

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
}

function updateNum() {
    if (operator === undefined) {
        num1 === undefined ? num1 = this.id : num1 += this.id
    } else {
        num2 === undefined ? num2 = this.id : num2 += this.id
    }
    updateNumDisplay();
}

function updateNumDisplay() {
    let currentNumber = document.querySelector(".bottomDisplay");
    if (operator === undefined) {
        currentNumber.textContent = `${num1}`
    } else {
        currentNumber.textContent = `${num2}`
    }
}

function updateOperator() {
    if (!(operator === undefined)) {
        performOperatorCalc();
    }
    operator = this.id;
    updateOperatorDisplay();
}


function performOperatorCalc() {
    let result = operate(parseInt(num1), operator, parseInt(num2));
    let currentEquation = document.querySelector(".topDisplay");
    let currentNumber = document.querySelector('.bottomDisplay');
    currentEquation.textContent = `${result} ${operator}`
    currentNumber.textContent = `${result}`
    num1 = result;
    num2 = undefined;
}

function updateOperatorDisplay() {
    let currentEquation = document.querySelector(".topDisplay");
    currentEquation.textContent = `${num1} ${operator}`;
}

function performEqualsCalc() {
    let result = operate(parseInt(num1), operator, parseInt(num2));
    let currentEquation = document.querySelector(".topDisplay");
    let currentNumber = document.querySelector('.bottomDisplay');
    currentEquation.textContent = `${num1} ${operator} ${num2} =`
    currentNumber.textContent = `${result}`
}

addButtonInteractivity();