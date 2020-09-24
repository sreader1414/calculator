import React from "react";
import "./CalculatorButton.css";

function CalculatorKey(props: { className?: string; onClick: (arg0: any) => void; keyValue: string|number; }) {
    return (
        <button
            className={`${props.className}`}
            onClick={() => props.onClick(props.keyValue)}
        >
            {props.keyValue}{" "}
        </button>
    );
}

export default CalculatorKey;