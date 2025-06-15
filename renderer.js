const math = require('mathjs');

const operationDisplay = document.querySelector('.calc-operation');
const typedDisplay = document.querySelector('.calc-typed');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let currentNumber = '';
let result = '';
let lastPressed = '';

function updateDisplays() {
  operationDisplay.textContent = currentInput;
  if (lastPressed === '=' && result !== '') {
    typedDisplay.innerHTML = result + '<span class="blink-me">_</span>';
  } else {
    typedDisplay.innerHTML = (currentNumber !== '' ? currentNumber : '') + '<span class="blink-me">_</span>';
  }
}

function appendToInput(value) {
  if (lastPressed === '=') {
    currentInput = '';
    currentNumber = '';
    result = '';
    lastPressed = '';
  }
  currentInput += value;
  currentNumber += value;
  lastPressed = value;
  updateDisplays();
}

function handleOperator(op) {
  if (currentInput === '' && op !== '−' && op !== '-') return;
  if (lastPressed === '=') {
    currentInput = result;
    result = '';
  }
  if (/[+\-x/]|mod$/.test(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  currentNumber = ''; // Reset for next number
  lastPressed = op;
  updateDisplays();
}

function handleEquals() {
  let expr = currentInput.replace(/x/g, '*').replace(/−/g, '-').replace(/mod/g, '%');
  try {
    let evalResult = math.evaluate(expr);
    result = evalResult.toString();
    lastPressed = '=';
    updateDisplays();
  } catch (e) {
    result = 'Error';
    lastPressed = '=';
    updateDisplays();
  }
}

function handleClear() {
  currentInput = '';
  currentNumber = '';
  result = '';
  lastPressed = '';
  updateDisplays();
}

function handleSpecial(op) {
  if (op === '√') {
    if (currentNumber) {
      let sqrtVal = '';
      try {
        sqrtVal = math.sqrt(Number(currentNumber));
        currentInput += `√(${currentNumber})`;
        currentNumber = sqrtVal.toString();
        updateDisplays();
      } catch {
        currentNumber = 'Error';
        updateDisplays();
      }
    }
  } else if (op === '%') {
    if (currentNumber) {
      currentInput += '%';
      currentNumber = '';
      updateDisplays();
    }
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent.trim();

    if (!isNaN(val) || val === '.') {
      // Number or decimal
      if (lastPressed === '=') handleClear();
      currentNumber += val;
      currentInput += val;
      lastPressed = val;
      updateDisplays();
    } else if (val === 'C') {
      handleClear();
    } else if (val === '+' || val === '−' || val === 'x' || val === '/' || val === 'mod') {
      handleOperator(val);
    } else if (val === '=') {
      handleEquals();
    } else if (val === '√' || val === '%') {
      handleSpecial(val);
    }
  });
});

// Initialize

