import React, { useEffect, useState } from 'react';

const CurrencyFormat = () => {
    const [formattedAmount, setFormattedAmount] = useState('');

    useEffect(() => {
        const staticAmount = 80200; // Your static amount
        const formatCurrency = (value) => {
            return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        };
        setFormattedAmount(`$${formatCurrency(staticAmount)}`);
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Formatted Amount</h2>
            <span className="text-xl">{formattedAmount}</span>
        </div>
    );
};

export default CurrencyFormat;
