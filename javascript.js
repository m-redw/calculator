let number1 = 0;
let number2 = 0;
let operator = '';

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

function operate(op, num1, num2) {
    if (op === '+' || op === 'add') {
        return add(num1, num2);
    } else if (op === '-' || op === 'subtract') {
        return subtract(num1, num2);
    } else if (op === 'x' || op === 'multiply') {
        return multiply(num1, num2);
    } else if (op === '/' || op === 'divide') {
        return divide(num1, num2);
    } else {
        return 'Please provide appropriate operator';
    }
}