import {useState, useEffect, useRef} from 'react';

export enum CalculatorOperations {
  DIVIDE = "/",
  MULTIPLY = "*",
  SUBTRACT = "-",
  ADD = "+",
  EQUALS = "="
}

export const useCalculator = () => {
  const [firstOperand, _setFirstOperand] = useState<string>('0');
  const [secondOperand, _setSecondOperand] = useState<string>('');
  const [op, _setOp] = useState(null);
  const [holdValue, _setHoldValue] = useState<string>('0');

  const firstOperandRef = useRef(firstOperand);
  const setFirstOperand = (x: string) => {
    firstOperandRef.current = x;
    _setFirstOperand(x);
  };

  const secondOperandRef = useRef(secondOperand);
  const setSecondOperand = (x: string) => {
    secondOperandRef.current = x;
    _setSecondOperand(x);
  };

  const opRef = useRef(op);
  const setOp = (x: string) => {
    opRef.current = x;
    _setOp(x);
  };

  const holdValueRef = useRef(holdValue);
  const setHoldValue = (x: string) => {
    holdValueRef.current = x;
    _setHoldValue(x);
  };

  const performOperation = () => {
    let firstInputNumber = parseFloat(firstOperandRef.current);
    let secondInputNumber = parseFloat(secondOperandRef.current);
    let returnedValue:number|string = 0;
    if (opRef.current && firstOperandRef.current && secondOperandRef.current) {
      switch(opRef.current) {
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
      }
    }
  };

  const useKeyPress = (targetKey: any, typeOfKey?: string, operation?: keyof typeof CalculatorOperations) => {
    // @ts-ignore
    function downHandler({ key }) {
      if (key === targetKey) {
        if (typeOfKey === 'number') {
          handleNumberInput(targetKey);
        }
        if (typeOfKey === 'operation') {
          handleOperation(operation);
        } else {
          switch (key) {
            case 'Backspace':
              let secondOpString = secondOperandRef.current;
              if (secondOpString.length === 1 || secondOpString === '') {
                clearData();
              } else {
                setSecondOperand(secondOpString === '' || secondOpString === '0' ? '0' : secondOpString.slice(0,-1));
              }
              break;
            case '%':
              percentage();
              break;
            case '.':
              insertDot();
              break;
          }
        }
      }
    }

    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      return () => {
        window.removeEventListener('keydown', downHandler);
      };
    }, []);
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

  const setNumbersAfterOperation = (returnedValue:number|string) => {
    if (typeof returnedValue === "string") {
      setFirstOperand('0');
      setSecondOperand(String(''));
      setOp(null)
    } else {
      if (opRef.current === 'EQUALS') {
        setFirstOperand(String('0'));
      } else {
        setFirstOperand(String(returnedValue));
      }
      setSecondOperand(String(''));
    }
    setHoldValue(String(returnedValue));
  };

  const clearData = () => {
    setFirstOperand('0');
    setSecondOperand('');
    setHoldValue('0');
    setOp(null);
  };

  const changeSign = () => {
    let changeNumber = secondOperandRef.current ? parseFloat(secondOperandRef.current) * -1 : parseFloat(firstOperandRef.current) * -1;
    if (secondOperandRef.current === '') {
      setFirstOperand(String(changeNumber));
      setHoldValue(String(changeNumber))
    } else {
      setSecondOperand(String(changeNumber));
    }
  };

  const insertDot = () => {
    if (!/\./.test(secondOperandRef.current)) {
      if (opRef.current === 'EQUALS') {
        setOp(null)
      }
      setSecondOperand(secondOperandRef.current + '.');
    }
  };

  const percentage = () => {
    let percentNumber = secondOperandRef.current ? parseFloat(secondOperandRef.current)/100 : parseFloat(firstOperandRef.current)/100;
    setSecondOperand(String(percentNumber));
    if (firstOperandRef.current && secondOperandRef.current === '') {
      setFirstOperand(String(percentNumber));
    }
  };

  const handleNumberInput = (value: string) => {
    let number = parseInt(value, 10);
    if (opRef.current === 'EQUALS' && secondOperandRef.current === '') {
      setFirstOperand(value);
      setSecondOperand(value);
      setHoldValue(value);
      setOp(null)
    } else {
      setSecondOperand(secondOperandRef.current === '' || secondOperandRef.current === '0' ? String(number) : String(secondOperandRef.current) + String(number));
    }
  };

  const handleOperation = (value: keyof typeof CalculatorOperations) => {
    if (firstOperandRef.current !== '' && secondOperandRef.current !== '') {
      if (firstOperandRef.current && opRef.current && secondOperandRef.current) {
        if (opRef.current === 'DIVIDE' && (Math.round(parseFloat(secondOperandRef.current)) === 0)) {
          setFirstOperand('0');
          setSecondOperand(String(''));
          setHoldValue('Divide 0 Error');
        } else {
          performOperation();
        }
      }
      if (opRef.current === null) {
        setOp(value);
        setFirstOperand(secondOperandRef.current === '' ? '0' : secondOperandRef.current);
        setHoldValue(secondOperandRef.current === '' ? '0' : secondOperandRef.current);
        setSecondOperand('');
      }
    }
    if (opRef.current) {
      setOp(value);
    }
  };

  return {
    secondOperandRef,
    holdValueRef,
    clearData,
    changeSign,
    percentage,
    insertDot,
    handleNumberInput,
    handleOperation,
    useKeyPress
  };
};
