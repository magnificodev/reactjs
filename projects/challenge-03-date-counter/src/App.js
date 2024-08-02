import { useState } from "react";

const App = () => {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date();
    date.setDate(date.getDate() + count);

    const handleStepDown = () => {
        step > 1 && setStep((prevStep) => prevStep - 1);
    };
    const handleStepUp = () => {
        setStep((prevStep) => prevStep + 1);
    };
    const handleCountDown = () => {
        setCount((prevCount) => prevCount - step);
    };
    const handleCountUp = () => {
        setCount((prevCount) => prevCount + step);
    };

    return (
        <div className="container">
            <div className="step-box">
                <button className="step-down" onClick={handleStepDown}>
                    −
                </button>
                <p className="step-label">Step: {step}</p>
                <button className="step-up" onClick={handleStepUp}>
                    +
                </button>
            </div>

            <div className="count-box">
                <button className="count-down" onClick={handleCountDown}>
                    −
                </button>
                <p className="count-label">Count: {count}</p>
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
        </div>
    );
};

export default App;
