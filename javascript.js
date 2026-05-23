let number1 = '';
let number2 = '';
let operator = '';
let justAnswered = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const dotButton = document.querySelector('.dot');
const undoButton = document.querySelector('.undo');
const ACButton = document.querySelector('.AC');

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

function updateDisplay(text) {
    const display = document.querySelector('.display');
    display.textContent = text;
}

function resetCalc() {
    number1 = '';
    number2 = '';
    operator = '';
}

function getAnswer() {
    const numNumber1 = Number(number1);
    const numNumber2 = Number(number2);
    const answer = Math.round(operate(operator, numNumber1, numNumber2));
    updateDisplay(String(answer));
    resetCalc();
    number1 = answer;
    justAnswered = true; 
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator != '') {
            number2 += button.textContent;
            updateDisplay(`${number1} ${operator} ${number2}`);
        } else {
            if (justAnswered) {
                number1 = button.textContent;
            } else {
                number1 += button.textContent;
            }
            justAnswered = false;
            updateDisplay(`${number1}`);
        }
    });
});

dotButton.addEventListener('click', () => {
    if (operator != '') {
        if (number2 === '') {
            number2 = '0.';
        } else if (!number2.includes('.')) {
            number2 += '.';
        }
        updateDisplay(`${number1} ${operator} ${number2}`);
    } else {
        if (justAnswered) {
            number1 += '.';
        } else {
            if (number1 === '') {
                number1 = '0.';
            } else if (!number1.includes('.')) {
                number1 += '.';
            }
        }
        justAnswered = false;
        updateDisplay(`${number1}`);
    }
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (number2 != '') {
            getAnswer();
            operator = button.textContent;
            updateDisplay(`${number1} ${operator} ${number2}`);
        } else if (number1 != '') {
            operator = button.textContent;
            updateDisplay(`${number1} ${operator} ${number2}`);
        } else {
            alert('Boi, ts (this) calc (calculator) needs a number inputted first!');
        }
    });
});

equalButton.addEventListener('click', () => {
    const isOperationReady = (number1 != '' && number2 != '' && operator != '');
    if (isOperationReady) {
        getAnswer();
    } else {
        alert('Boi, ts (this) calc (calculator) needs 2 nums and an operator!');
    }
})

ACButton.addEventListener('click', () => {
    resetCalc();
    updateDisplay('');
});

undoButton.addEventListener('click', () => {
    const isOnNum1 = (operator === '');
    const isOnOperator = (number2 === '');

    if (isOnNum1 && number1 != '') {
        number1 = number1.slice(0, -1);
        updateDisplay(`${number1}`);
    } else if (isOnOperator && operator != '') {
        operator = '';
        updateDisplay(`${number1} ${operator}`);
    } else if (number2 != ''){
        number2 = number2.slice(0, -1);
        updateDisplay(`${number1} ${operator} ${number2}`);
    }

});