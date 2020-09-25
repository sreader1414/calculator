import {useEffect, useState} from 'react';

export const CalculatorOperations: {
  [key: string]: (firstValue: number, secondValue: number) => number;
} = {
  '/': (firstValue, secondValue) => firstValue / secondValue,
  '*': (firstValue, secondValue) => firstValue * secondValue,
  '-': (firstValue, secondValue) => firstValue - secondValue,
  '+': (firstValue, secondValue) => firstValue + secondValue,
  '=': (firstValue, secondValue) => secondValue
};

export const useCalculator = () => {
  const [firstOperand, setFirstOperand] = useState(null);
  const [secondOperand, setSecondOperand] = useState('0');
  const [op, setOp] = useState(null);
  const [holdValue, setHoldValue] = useState(null);

  const clearData = () => {
    setSecondOperand('0');
    setFirstOperand(0);
    setOp(null);
  };

  const changeSign = () => {
    let changeNumber = secondOperand ? secondOperand : firstOperand;
    // @ts-ignore
    setSecondOperand(parseFloat(changeNumber) * -1);
  };

  const insertDot = () => {
    if (!/\./.test(secondOperand)) {
      setSecondOperand(secondOperand + '.');
    }
  };

  const percentage = () => {
    let percentNumber = secondOperand ? secondOperand : firstOperand;
    // @ts-ignore
    setSecondOperand(parseFloat(percentNumber) / 100);
    if (firstOperand && secondOperand === '') {
      setFirstOperand(parseFloat(firstOperand) / 100);
    }
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(firstOperand),
      parseFloat(secondOperand)
    );
    setHoldValue(String(temp));
    setFirstOperand(String(temp));
    setSecondOperand("");
  };

  const handleNumberInput = (value: string) => {
    let number = parseInt(value, 10);
    if (op === null && firstOperand === null && holdValue && secondOperand) {
      setSecondOperand(value)
    } else {
      setSecondOperand(secondOperand === '0' ? String(number) : secondOperand + number);
    }
  };

  const handleOperation = (value: string) => {
    if (op === null) {
      setOp(value);
      setFirstOperand(secondOperand);
      setSecondOperand('');
      setHoldValue(secondOperand);
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
