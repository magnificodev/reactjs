import { useState } from "react";

const App = () => {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date();
    date.setDate(date.getDate() + count);

    const handleCountDown = () => {
        setCount((prevCount) => prevCount - step);
    };
    const handleCountUp = () => {
        setCount((prevCount) => prevCount + step);
    };

    return (
        <div className="container">
            <div className="step-box">
                <input
                    type="range"
                    min={1}
                    max={10}
                    id="step-range"
                    onChange={(e) => setStep(Number(e.currentTarget.value))}
                    value={step}
                />
                <label htmlFor="step-range">{step}</label>
            </div>

            <div className="count-box">
                <button className="count-down" onClick={handleCountDown}>
                    −
                </button>
                <input
                    type="text"
                    value={count}
                    onChange={(e) => setCount(Number(e.currentTarget.value))}
                />
                <button className="count-up" onClick={handleCountUp}>
                    +
                </button>
            </div>

            <p className="message">
                <span>
                    {count === 0
                        ? "Today is "
                        : count < 0
                        ? `${count * -1} days ago was `
                        : `${count} days from today is `}
                </span>
                <span>{date.toDateString()}</span>
            </p>

            {(count !== 0 || step !== 1) && (
                <input
                    type="reset"
                    className="reset-btn"
                    onClick={() => {
                        setStep(1);
                        setCount(0);
                    }}
                />
            )}
        </div>
    );
};

export default App;
