import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

export default function App() {
    return (
        <div>
            <Steps />
        </div>
    );
}

function Steps() {
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
        isOpen && (
            <div className="steps">
                <div className="numbers">
                    <div className={step >= 1 ? "active" : ""}>1</div>
                    <div className={step >= 2 ? "active" : ""}>2</div>
                    <div className={step >= 3 ? "active" : ""}>3</div>
                </div>
                <StepMessage step={step}>{messages[step - 1]}</StepMessage>
                <div className="buttons">
                    <Button
                        color="var(--white-color)"
                        backColor="var(--primary-color)"
                        onClick={handlePrevious}
                        isDisabled={step <= 1}
                    >
                        <span>👈Previous</span>
                    </Button>
                    <Button
                        color="var(--white-color)"
                        backColor="var(--primary-color)"
                        onClick={handleNext}
                        isDisabled={step >= 3}
                    >
                        <span>Next👉</span>
                    </Button>
                </div>
            </div>
        )
    );
}

function StepMessage({ step, children }) {
    return (
        <div className="message">
            <h3>Step {step}:</h3> {children}
        </div>
    );
}

function Button({ color, backColor, onClick, isDisabled, children }) {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: backColor,
                color: color,
            }}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}
