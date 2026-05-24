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
    const strAnswer = String(answer);

    if (strAnswer === 'Infinity' || strAnswer === 'NaN') {
        updateDisplay('Undefined');
    } else {
        updateDisplay(strAnswer);
    }
    
    resetCalc();
    number1 = String(answer);
    justAnswered = true; 
}

function inputNumber(num) {
    if (operator != '') {
        number2 += num;
        updateDisplay(`${number1} ${operator} ${number2}`);
    } else {
        if (justAnswered) {
            number1 = num;
        } else {
            number1 += num;
        }
        justAnswered = false;
        updateDisplay(`${number1}`);
    }
}

function inputOperator(op) {
    if (op === '*') {
        op = 'x';
    }

    if (number2 != '') {
        getAnswer();
        operator = op;
        updateDisplay(`${number1} ${operator} ${number2}`);
    } else if (number1 != '') {
        operator = op;
        updateDisplay(`${number1} ${operator} ${number2}`);
    } else {
        alert('Boi, ts (this) calc (calculator) needs a number inputted first!');
    }
}

function inputDot() {
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
}

function inputEqual() {
    const isOperationReady = (number1 != '' && number2 != '' && operator != '');
    if (isOperationReady) {
        getAnswer();
    } else {
        alert('Boi, ts (this) calc (calculator) needs 2 nums and an operator!');
    }
}

function inputUndo() {
    const isOnNum1 = (operator === '');
    const isOnOperator = (number2 === '');

    if (isOnNum1 && number1 != '') {
        console.log(number1)
        number1 = number1.slice(0, -1);
        updateDisplay(`${number1}`);
    } else if (isOnOperator && operator != '') {
        operator = '';
        updateDisplay(`${number1} ${operator}`);
    } else if (number2 != ''){
        number2 = number2.slice(0, -1);
        updateDisplay(`${number1} ${operator} ${number2}`);
    }
}


// buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputNumber(button.textContent);
    });
});

dotButton.addEventListener('click', () => {
    inputDot();
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputOperator(button.textContent);
    });
});

equalButton.addEventListener('click', () => {
    inputEqual();
})

ACButton.addEventListener('click', () => {
    resetCalc();
    updateDisplay('');
});

undoButton.addEventListener('click', () => {
    inputUndo();
});


// keyboard support
document.addEventListener('keydown', (event) => {
    console.log(event.key)

    const numbers = '1234567890';
    const operators = '-+/x*';

    if (numbers.includes(event.key)) {
        inputNumber(event.key);
    } else if (operators.includes(event.key)) {
        inputOperator(event.key);
    } else if (event.key === '.') {
        inputDot();
    } else if (event.key === '=' || event.key === 'Enter') {
        inputEqual();
    } else if (event.key === 'Backspace') {
        inputUndo();
    }
});



//button effects
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('button-hover');
    });

    button.addEventListener('mouseleave', () => {
        button.classList.remove('button-hover');
    });

    button.addEventListener('mousedown', () => {
        button.classList.add('button-press');
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove('button-press');
    });
});