import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorButton";
import "../styles/Calculator.css";

function Calculator() {
    const [previousValue, setPreviousValue] = useState(null);
    const [nextValue, setNextValue] = useState("0");
    const [holdValue, setHoldValue] = useState(null);
    const [op, setOp] = useState(null);

    useEffect(() => {}, [op, nextValue, previousValue, setHoldValue]);

    const CalculatorOperations: { [key: string]: (firstValue: number, secondValue: number)=>number } = {
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue)  => firstValue - secondValue,
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "=": (firstValue, secondValue)  => secondValue,
    };

    const performOperation = (equal:boolean) => {
        let temp = CalculatorOperations[op](
            parseFloat(previousValue),
            parseFloat(nextValue)
        );
        if (equal) {
            setOp(null);
            setNextValue(String(temp));
            setHoldValue(String(null));
            setPreviousValue(null);
        } else {
            setPreviousValue(String(temp));
            setHoldValue(String(temp));
            setNextValue("");
        }
    };

    const handleNum = (number: number) => {
        setNextValue(nextValue === "0" ? String(number) : nextValue + number);
    };

    const insertDot = () => {
        if (!/\./.test(nextValue)) {
            setNextValue(nextValue + ".");
        }
    };
    const percentage = () => {
        // @ts-ignore
        setNextValue(parseFloat(nextValue) / 100);
        if (previousValue && nextValue === "") {
            setPreviousValue(parseFloat(previousValue) / 100);
        }
    };
    const changeSign = () => {
        // @ts-ignore
        setNextValue(parseFloat(nextValue) * -1);
    };
    const clearData = () => {
        setNextValue("0");
        setPreviousValue(0);
        setOp(null);
    };

    const handleOperation = (value:string) => {
        if (Number.isInteger(value)) {
            handleNum(parseInt(value, 10));
        } else if (value in CalculatorOperations) {
            if (op === null) {
                setOp(value);
                setPreviousValue(nextValue);
                setNextValue("");
                setHoldValue(null);
            }
            if (op) {
                setOp(value);
            }
            if (previousValue && op && nextValue && value !== '=') {
                performOperation(false);
            }
            if (previousValue && op && nextValue && value == '=') {
                performOperation(true);
            }
        } else if (value === "c") {
            clearData();
        } else if (value === "\xB1") {
            changeSign();
        } else if (value === ".") {
            insertDot();
        } else if (value === "%") {
            percentage();
        }
    };

    let calculatorKeysNumbered = [];
    for(let i = 9; i>0; i--) {
        calculatorKeysNumbered.push(<CalculatorKey key={`calc_key_${i}`} keyValue={i} onClick={handleOperation} />)
    }

    return (
        <div className="calculator">
            <div className="calculator-input">
                <div className="result">{nextValue === "" && holdValue ? holdValue : nextValue} </div>
            </div>
            <div className="calculator-keypad">
                <div className="keys-function">
                    <CalculatorKey keyValue={"c"} onClick={handleOperation} />
                    <CalculatorKey keyValue={"\xB1"} onClick={handleOperation} />
                    <CalculatorKey keyValue={"%"} onClick={handleOperation} />
                </div>
                <div className="keys-operators">
                    {
                        Object.keys(CalculatorOperations).map((operation,i) => {
                            return <CalculatorKey key={`operator_key_${i}`} keyValue={operation} onClick={handleOperation} />
                        })
                    }
                </div>
                <div className="keys-numbers">
                    {
                       calculatorKeysNumbered
                    }
                    <CalculatorKey
                        className="key-dot"
                        keyValue={"."}
                        onClick={handleOperation}
                    />
                    <CalculatorKey
                        className="key-zero"
                        keyValue={0}
                        onClick={handleOperation}
                    />
                </div>
            </div>
        </div>
    );
}

export default Calculator;