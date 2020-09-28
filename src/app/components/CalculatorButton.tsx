import React, { FC } from 'react';

interface Props {
    keyValue: string | number;
    operationName?: string;
    onClick(selection: any): void;
    className?: string;
}
export const CalculatorButton: FC<Props> = ({keyValue, operationName, onClick, className}) => (
    <button className={className} onClick={() => onClick(operationName||keyValue)}>
        {keyValue}
    </button>
);
