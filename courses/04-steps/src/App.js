import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

const App = () => {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const handlePrevious = () => {
        step > 1 && setStep((prevStep) => prevStep - 1);
    };

    const handleNext = () => {
        step < 3 && setStep((prevStep) => prevStep + 1);
    };

    const handleClose = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <>
            <button className="close" onClick={handleClose}>
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>
                    <div className="message">
                        Step {step}: {messages[step - 1]}
                    </div>
                    <div className="buttons">
                        <button
                            disabled={step <= 1}
                            onClick={handlePrevious}
                            style={{
                                backgroundColor: "var(--primary-color)",
                                color: "var(--white-color)",
                            }}
                        >
                            <span>Previous</span>
                        </button>
                        <button
                            disabled={step >= 3}
                            onClick={handleNext}
                            style={{
                                backgroundColor: "var(--primary-color)",
                                color: "var(--white-color)",
                            }}
                        >
                            <span>Next</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
