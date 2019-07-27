window.onload = function(){
  const calculator = document.querySelector('.calculator');
  const keys = document.querySelector('.calculator__keys');
  const display = document.querySelector('.calculator__display');

  const calculate = (n1, operator, n2) => {
    let result = '';
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
  };

  const notAction = function (key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if(!action){
      calculator.dataset.previousKey = 'number';
      if(displayedNum == '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
        display.textContent = keyContent;
      }
      else{
        display.textContent = displayedNum+keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }
  };

  const operationAction = function(key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }
  };

  const notClearAction = function(key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }
  };

  const clearAction = function (key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC';
      }
      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }
  };

  const decimalAction = function(key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.';
      }
      calculator.dataset.previousKey = 'decimal';
      calculator.dataset.previousKeyType = 'decimal';
    }
  };

  const calculateAction = function(key, action, keyContent, displayedNum, calculator, previousKeyType, display){
    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }
  };

  const clickEvtHandler = (e) => {
    if(e.target.matches('button')){
      debugger;
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      const calculator = document.querySelector('.calculator');
      const previousKeyType = calculator.dataset.previousKeyType;
      notAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      operationAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      notClearAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      clearAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      decimalAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      calculateAction(key, action, keyContent, displayedNum, calculator, previousKeyType, display);
      Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    }
  };
  keys.addEventListener('click', clickEvtHandler);
};
