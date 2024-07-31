const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

const App = () => {
    const step = 1;

    const previous = (e) => {
        console.log(e.target)
    }

    const next = (e) => {
        console.log(e.target)
    }

    return (
        <div className="steps">
            <div className="numbers">
                <div className={step >= 1 && "active"}>1</div>
                <div className={step >= 2 && "active"}>2</div>
                <div className={step >= 3 && "active"}>3</div>
            </div>
            <div className="message">
                <h3>
                    Step {step}: {messages[step - 1]}
                </h3>
            </div>
            <div className="buttons">
                <button
                    onClick={previous}
                    style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)",
                    }}
                >
                    <span>Previous</span>
                </button>
                <button
                    onClick={next}
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
