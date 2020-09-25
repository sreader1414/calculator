import React, { FC } from 'react';

interface Props {
    keyValue: string | number;
    onClick(selection: any): void;
    className?: string;
}

export const CalculatorButton: FC<Props> = ({
                                                keyValue,
                                                onClick,
                                                className,
                                            }) => (
    <button className={className} onClick={() => onClick(keyValue)}>
        {keyValue}
    </button>
);
