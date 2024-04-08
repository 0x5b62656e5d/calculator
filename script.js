const operatorbtns = document.querySelectorAll('#operator');
const numberbtns = document.querySelectorAll('#number');
const decimalbtn = document.querySelector('#decimal');
const equalbtn = document.querySelector('#equal');
const clearbtn = document.querySelector('#clear');
const deletebtn = document.querySelector('#delete');

const currentOperation = document.querySelector('#operation');
const currentInput = document.querySelector('#input');

var value1 = 0;
var operation = '';

numberbtns.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

operatorbtns.forEach(btn => {
    btn.addEventListener('click', () => setOperator(btn.textContent));
});

decimalbtn.addEventListener('click', appendDecimal);

equalbtn.addEventListener('click', () => {
    if (evaluate(operation, value1) == 'ERROR') {
        currentOperation.textContent = '';
        currentInput.textContent = 'ERROR';
        return;
    }
    let result = Math.round(evaluate(operation, value1) * 10000) / 10000
    currentInput.textContent = `${result}`;
    currentOperation.textContent = `${result} +`;
    value1 = Number(currentInput.textContent);
});

clearbtn.addEventListener('click', clearScreen);
deletebtn.addEventListener('click', deleteNum);

window.addEventListener('keydown', keyDown);

function appendNumber(number) {
    if (currentInput.textContent === 'ERROR') { clearScreen(); }
    currentInput.textContent += number;
}

function setOperator(operator) {
    operation = operator;
    value1 = Number(currentInput.textContent);
    currentOperation.textContent = `${currentInput.textContent} ${operation}`;
    currentInput.textContent = '';
}

function appendDecimal() {
    if (currentInput.textContent.includes('.')) { return; }
    currentInput.textContent += '.';
}

function clearScreen() {
    currentOperation.textContent = '';
    currentInput.textContent = '';
}

function deleteNum() {
    currentInput.textContent = currentInput.textContent.toString().slice(0, -1);
}

function keyDown(key) {
    if (Number(key.key) >= 0 && Number(key.key) <= 9) { appendNumber(key.key); }
    if (key.key == 'Backspace') { deleteNum(); }
    if (key.key == 'Escape') { clearScreen(); }
    if (key.key == '/') { setOperator('÷'); }
    else if (key.key == '*') { setOperator('×'); }
    else if (key.key == '-') { setOperator('-'); }
    else if (key.key == '+') { setOperator('+'); }
    if (key.key == 'Enter') { equalbtn.click(); }
}

const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

function evaluate(operator, a) {
    let b = Number(currentInput.textContent);
    switch (operator) {
            case '+':
                return add(a, b);
            case '-':
                return subtract(a, b);
            case '×':
                return multiply(a, b);
            case '÷':
                if (b === 0) { return 'ERROR'; }
                return divide(a, b);
        }
}

