import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorButton";
import "./Calculator.css";

function Calculator() {
    const [prevValue, setPrevValue] = useState(null);
    const [nextValue, setNextValue] = useState("0");
    const [op, setOp] = useState(null);

    useEffect(() => {}, [op, nextValue, prevValue]);

    const CalculatorOperations: { [key: string]: (firstValue: number, secondValue: number)=>number } = {
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue)  => firstValue - secondValue,
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "=": (firstValue, secondValue)  => secondValue,
    };

    const performOperation = () => {
        let temp = CalculatorOperations[op](
            parseFloat(prevValue),
            parseFloat(nextValue)
        );
        setOp(null);
        setNextValue(String(temp));
        setPrevValue(null);
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
        if (prevValue && nextValue === "") {
            setPrevValue(parseFloat(prevValue) / 100);
        }
    };
    const changeSign = () => {
        // @ts-ignore
        setNextValue(parseFloat(nextValue) * -1);
    };
    const clearData = () => {
        setNextValue("0");
        setPrevValue(0);
    };

    const handleOperation = (value:string) => {
        if (Number.isInteger(value)) {
            handleNum(parseInt(value, 10));
        } else if (value in CalculatorOperations) {
            if (op === null) {
                setOp(value);
                setPrevValue(nextValue);
                setNextValue("");
            }
            if (op) {
                setOp(value);
            }
            if (prevValue && op && nextValue) {
                performOperation();
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
    for(let i = 0; i<9; i++) {
        calculatorKeysNumbered.push(<CalculatorKey key={`calc_key_${i}`} keyValue={i} onClick={handleOperation} />)
    }

    return (
        <div className="calculator">
            <div className="calculator-input">
                <div className="result">{nextValue} </div>
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