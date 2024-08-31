const resultElement = document.getElementById('result');

const divideBtn = document.getElementById("divide-button");
const multiplyBtn = document.getElementById("multiply-button");
const subtractBtn = document.getElementById("subtract-button");
const additionBtn = document.getElementById("addition-button");
const decimalBtn = document.getElementById("decimal-button");
const equalBtn = document.getElementById("equal-button");
const numberBtns = document.querySelectorAll(".nums");
const clearBtn = document.getElementById("clear-button");
const deleteBtn = document.getElementById("delete-button");

// Function to clear the calculator
clearBtn.addEventListener('click', () => {
    result = "";
    operation = "";
    previousOperand = 0;
    updateDisplay();
});

// Function to delete the last character
deleteBtn.addEventListener('click', () => {
    result = result.slice(0, -1);
    updateDisplay();
});

// Initializing the variables
let result = "";
let operation = "";
let previousOperand = 0;

// Function to append numbers
const appendNumber = (number) => {
    if (number === "." && result.includes(".")) {
        return;
    }
    result += number;
    updateDisplay();
}

// Function to update display
const updateDisplay = () => {
    if (operation) {
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    } else {
        resultElement.innerText = result;
    }
}

// Function to update operator
const selectOperator = (operatorValue) => {
    if (result === "") return;

    if (operation !== "" && previousOperand !== "") {
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = parseFloat(result);
    result = "";
    updateDisplay();
}

// Function to calculate result
const calculateResult = () => {
    let currentOperand = parseFloat(result);
    switch (operation) {
        case "+":
            result = previousOperand + currentOperand;
            break;
        case "-":
            result = previousOperand - currentOperand;
            break;
        case "*":
            result = previousOperand * currentOperand;
            break;
        case "/":
            if (currentOperand === 0) {
                result = "Error: Division by zero";
            } else {
                result = previousOperand / currentOperand;
            }
            break;
        default:
            return;
    }
    operation = "";
    previousOperand = parseFloat(result);
    updateDisplay();
}

// Event listeners for number buttons
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

// Event listeners for other buttons
decimalBtn.addEventListener('click', () => appendNumber("."));
additionBtn.addEventListener('click', () => selectOperator("+"));
subtractBtn.addEventListener('click', () => selectOperator("-"));
multiplyBtn.addEventListener('click', () => selectOperator("*"));
divideBtn.addEventListener('click', () => selectOperator("/"));
equalBtn.addEventListener('click', () => calculateResult());
