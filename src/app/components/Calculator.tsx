import React, {FC, useEffect, useMemo} from 'react';
import { CalculatorButton } from './CalculatorButton';
import { useCalculator, CalculatorOperations } from '../hooks';
import { numberValues } from '../constants';

export const Calculator: FC = () => {
    const { nextValue, holdValue, clearData, changeSign, percentage, insertDot, handleNumberInput, handleOperation } = useCalculator();

    useEffect(() => {
        console.log(nextValue)
    }, [nextValue]);

    const numberButtons = useMemo(
        () =>
            numberValues.map((number) => {
                console.log('test');
                return (
                    <CalculatorButton
                        key={number}
                        keyValue={number}
                        onClick={handleNumberInput}
                    />
                );
            }),
        []
    );

    return (
        <div className="calculator">
            <div className="calculator-input">
                <div className="result">
                    {nextValue === '' && holdValue ? holdValue : nextValue}{' '}
                </div>
            </div>
            <div className="calculator-keypad">
                <div className="keys-function">
                    <CalculatorButton keyValue={'c'} onClick={clearData} />
                    <CalculatorButton keyValue={'\xB1'} onClick={changeSign} />
                    <CalculatorButton keyValue={'%'} onClick={percentage} />
                </div>
                <div className="keys-operators">
                    {Object.keys(CalculatorOperations).map((operation, i) => {
                        return (
                            <CalculatorButton
                                key={i}
                                keyValue={operation}
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
                        keyValue={0}
                        onClick={handleOperation}
                    />
                </div>
            </div>
        </div>
    );
};
