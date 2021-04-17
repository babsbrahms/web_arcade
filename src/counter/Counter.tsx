import React, { useState } from 'react';
import "./Counter.css"

const Counter: React.FC = () => {
    const [counterValue, setCounterValue] = useState(0)
    const [inputValue, setInputValue] = useState(1)
    return (
        <div>
            <h3 data-testid="header">My Counter</h3>
            <h2 className={`${counterValue >= 100? "green" : ""}${counterValue <= -100? "red" : ""}`} data-testid="counter">{counterValue}</h2>

        
            <button data-testid="sub-btn" onClick={() => setCounterValue(counterValue - inputValue)}>-</button>
            <input className="text-center" type="number" data-testid="input" value={inputValue} onChange={(e) => setInputValue(parseInt(e.target.value))}/>
            <button data-testid="add-btn" onClick={() => setCounterValue(counterValue + inputValue)}>+</button>

        </div>
    )
}


export default Counter;