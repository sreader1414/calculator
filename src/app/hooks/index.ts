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
  const [previousValue, setPreviousValue] = useState(null);
  const [nextValue, setNextValue] = useState('0');
  const [op, setOp] = useState(null);
  const [holdValue, setHoldValue] = useState(null);

  const clearData = () => {
    setNextValue('0');
    setPreviousValue(0);
    setOp(null);
  };

  const changeSign = () => {
    let changeNumber = nextValue ? nextValue : previousValue;
    // @ts-ignore
    setNextValue(parseFloat(changeNumber) * -1);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + '.');
    }
  };

  const percentage = () => {
    let percentNumber = nextValue ? nextValue : previousValue;
    // @ts-ignore
    setNextValue(parseFloat(percentNumber) / 100);
    if (previousValue && nextValue === '') {
      setPreviousValue(parseFloat(previousValue) / 100);
    }
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(previousValue),
      parseFloat(nextValue)
    );
    setHoldValue(String(temp));
    setPreviousValue(String(temp));
    setNextValue("");
  };

  const handleNum = (number: number) => {
    console.log('op:',op, '  prev:',previousValue,  '  hold:', holdValue,  '  next:', nextValue)
    if (op === null && previousValue === null && holdValue && nextValue) {
      setNextValue(String(number))
    } else {
      setNextValue(nextValue === '0' ? String(number) : nextValue + number);
    }
  };

  const handleNumberInput = (value: string) => {
      handleNum(parseInt(value, 10));
  };

  const handleOperation = (value: string) => {
    if (op === null) {
      setOp(value);
      setPreviousValue(nextValue);
      setNextValue('');
      setHoldValue(nextValue);
    }
    if (op) {
      setOp(value);
    }
    if (previousValue && op && nextValue) {
      performOperation();
    }
  };

  return {
    nextValue,
    holdValue,
    clearData,
    changeSign,
    percentage,
    insertDot,
    handleNumberInput,
    handleOperation,
  };
};
