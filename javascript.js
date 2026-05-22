let number1 = '';
let number2 = '';
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
    const numNumber1 = parseInt(number1);
    const numNumber2 = parseInt(number2);
    const answer = operate(operator, numNumber1, numNumber2);
    updateDisplay(String(answer));
    resetCalc();
    number1 = answer;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const nonNumbers = '+-x/=';
        const isNumber = !nonNumbers.includes(button.textContent);
        if (isNumber) {
            if (button.textContent === 'AC') {
                resetCalc();
                updateDisplay('');
                return;
            }

            if (operator != '') {
                number2 += button.textContent;
                updateDisplay(`${number1} ${operator} ${number2}`);
            } else {
                number1 += button.textContent;
                updateDisplay(`${number1}`);
            }
        } else if (button.textContent === '=') {
            const isOperationReady = (number1 != '' && number2 != '' && operator != '');
            if (isOperationReady) {
                getAnswer();
            } else {
                alert('Boi, ts (this) calc (calculator) needs 2 nums and an operator!');
            }
        } else {
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
        }   
    });
});