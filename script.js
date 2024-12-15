const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        switch (value) {
            case 'C':
                clearDisplay();
                break;
            case '=':
                calculateResult();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                setOperator(value);
                break;
            default:
                appendToInput(value);
                break;
        }
    });
});

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.value = '';
}

function calculateResult() {
    if (currentInput && previousInput && operator) {
        try {
            const result = eval(`${previousInput} ${operator} ${currentInput}`);
            display.value = formatResult(result);
            previousInput = result;
            currentInput = '';
            operator = '';
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
            operator = '';
            previousInput = '';
        }
    }
}

function setOperator(op) {
    if (currentInput) {
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

function appendToInput(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    display.value = currentInput;
}

function formatResult(result) {
    return Number.isInteger(result) ? result : result.toFixed(2);
}
