const math = require('mathjs');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    switch (value) {
      case 'C':
        display.innerText = '';
        break;

      case '=':
        try {
          const replaced = display.innerText
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI)
            .replace(/mod/g, '%')
            .replace(/√/g, 'sqrt')
            .replace(/e/g, Math.E);
          display.innerText = math.evaluate(replaced);
        } catch (err) {
          display.innerText = 'Error';
        }
        break;

      case '√':
        display.innerText += '√(';
        break;

      case 'π':
      case 'mod':
      case 'e':
      case '(':
      case ')':
      case '.':
      case '%':
        display.innerText += value;
        break;

      default:
        display.innerText += value;
    }
  });
});

