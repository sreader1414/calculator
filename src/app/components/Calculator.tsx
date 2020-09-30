import React, {FC} from 'react';
import { CalculatorButton } from './CalculatorButton';
import { useCalculator, CalculatorOperations } from '../hooks/Hooks';
import { numberValues } from '../constants';

export const Calculator: FC = () => {
    const { secondOperandRef, holdValueRef, clearData, changeSign, percentage, insertDot, handleNumberInput, handleOperation, useKeyPress } = useCalculator();

    // Special case key press listeners
    useKeyPress('0', 'number');
    useKeyPress('Enter', 'operation', 'EQUALS');
    useKeyPress('Backspace');
    useKeyPress('%');
    useKeyPress('.');

    const numberButtons =
        numberValues.map((number) => {
            useKeyPress(String(number), "number");
            return (
                <CalculatorButton
                    key={number}
                    keyValue={number}
                    onClick={handleNumberInput}
                />
            );
        });

    return (
        <div className="calculator">
            <div className="calculator-input">
                <div className="result">
                    {secondOperandRef.current === '' && holdValueRef.current ? holdValueRef.current : secondOperandRef.current}{' '}
                </div>
            </div>
            <div className="calculator-keypad">
                <div className="keys-function">
                    <CalculatorButton keyValue={'c'} onClick={clearData} />
                    <CalculatorButton keyValue={'\xB1'} onClick={changeSign} />
                    <CalculatorButton keyValue={'%'} onClick={percentage} />
                </div>
                <div className="keys-operators">
                    {Object.keys(CalculatorOperations).map((operation:keyof typeof CalculatorOperations, i:number) => {
                        useKeyPress(CalculatorOperations[operation], "operation", operation);
                        return (
                            <CalculatorButton
                                key={i}
                                keyValue={CalculatorOperations[operation]}
                                operationName = {operation}
                                onClick={handleOperation}
                            />
                        );
                    })}
                </div>
                <div className="keys-numbers">
                    {numberButtons}
                    <CalculatorButton
                        className="key-dot"
                        keyValue={'.'}
                        onClick={insertDot}
                    />
                    <CalculatorButton
                        className="key-zero"
                        keyValue={'0'}
                        onClick={handleNumberInput}
                    />
                </div>
            </div>
        </div>
    );
};
