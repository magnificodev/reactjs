const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

const App = () => {
    var step = 1;

    const handlePrevious = (e) => {
        console.log(e.currentTarget)
    }

    const handleNext = (e) => {
        console.log(e.currentTarget)
    }

    return (
        <div className="steps">
            <div className="numbers">
                <div className={step >= 1 ? "active" : ""}>1</div>
                <div className={step >= 2 ? "active" : ""}>2</div>
                <div className={step >= 3 ? "active" : ""}>3</div>
            </div>
            <div className="message">
                <h3>
                    Step {step}: {messages[step - 1]}
                </h3>
            </div>
            <div className="buttons">
                <button
                    onClick={handlePrevious}
                    style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)",
                    }}
                >
                    <span>Previous</span>
                </button>
                <button
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
    );
};

export default App;
