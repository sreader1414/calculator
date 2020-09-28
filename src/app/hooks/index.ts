import {useState} from 'react';

export enum CalculatorOperations {
  DIVIDE = "/",
  MULTIPLY = "*",
  SUBTRACT = "-",
  ADD = "+",
  EQUALS = "="
}

export const useCalculator = () => {
  const [firstOperand, setFirstOperand] = useState<string>('0');
  const [secondOperand, setSecondOperand] = useState<string>('');
  const [op, setOp] = useState(null);
  const [holdValue, setHoldValue] = useState<string>('0');

  const performOperation = () => {
    let firstInputNumber = parseFloat(firstOperand);
    let secondInputNumber = parseFloat(secondOperand);
    let returnedValue:number = 0;
    if (op && firstOperand && secondOperand) {
      switch(op) {
        case 'ADD':
          returnedValue = add(firstInputNumber,secondInputNumber);
          setNumbersAfterOperation(returnedValue);
          break;
        case 'SUBTRACT':
          returnedValue = subtract(firstInputNumber,secondInputNumber);
          setNumbersAfterOperation(returnedValue);
          break;
        case 'MULTIPLY':
          returnedValue = multiply(firstInputNumber,secondInputNumber);
          setNumbersAfterOperation(returnedValue);
          break;
        case 'DIVIDE':
          returnedValue = divide(firstInputNumber,secondInputNumber);
          setNumbersAfterOperation(returnedValue);
          break;
        case 'EQUALS':
          break;
        default:
          break;
      }

    }
  };

  const add = (firstValue:number, secondValue:number) => {
    return firstValue + secondValue;
  };

  const subtract = (firstValue:number, secondValue:number) => {
    return firstValue - secondValue;
  };

  const multiply = (firstValue:number, secondValue:number) => {
    return firstValue * secondValue;
  };

  const divide = (firstValue:number, secondValue:number) => {
    return firstValue / secondValue;
  };

  const setNumbersAfterOperation = (returnedValue:number) => {
    setFirstOperand(String(returnedValue));
    setSecondOperand(String(''));
    setHoldValue(String(returnedValue));
  };

  const clearData = () => {
    setFirstOperand('0');
    setSecondOperand('');
    setHoldValue('0');
    setOp(null);
  };

  const changeSign = () => {
    let changeNumber = secondOperand ? parseFloat(secondOperand) * -1 : parseFloat(firstOperand) * -1;
    if (secondOperand === '') {
      setFirstOperand(String(changeNumber));
      setHoldValue(String(changeNumber))
    } else {
      setSecondOperand(String(changeNumber));
    }
  };

  const insertDot = () => {
    if (!/\./.test(secondOperand)) {
      if (op === 'EQUALS') {
        setOp(null)
      }
      setSecondOperand(secondOperand + '.');
    }
  };

  const percentage = () => {
    let percentNumber = secondOperand ? parseFloat(secondOperand)/100 : parseFloat(firstOperand)/100;
    setSecondOperand(String(percentNumber));
    if (firstOperand && secondOperand === '') {
      setFirstOperand(String(percentNumber));
    }
  };

  const handleNumberInput = (value: string) => {
    let number = parseInt(value, 10);
    if (op === 'EQUALS') {
      setFirstOperand(value);
      setSecondOperand('');
      setHoldValue(value);
      setOp(null)
    } else {
      setSecondOperand(secondOperand === '' || secondOperand === '0' ? String(number) : secondOperand + number);
    }
  };

  const handleOperation = (value: keyof typeof CalculatorOperations) => {
    if (op === null) {
      setOp(value);
      setFirstOperand(secondOperand === '' ? '0' : secondOperand);
      setSecondOperand('');
      setHoldValue(secondOperand === '' ? '0' : secondOperand);
    }
    if (op) {
      setOp(value);
    }
    if (firstOperand && op && secondOperand) {
      performOperation();
    }
  };

  return {
    secondOperand,
    holdValue,
    clearData,
    changeSign,
    percentage,
    insertDot,
    handleNumberInput,
    handleOperation,
  };
};
