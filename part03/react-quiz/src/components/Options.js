import React from "react";

const Options = ({ question, dispatch, answer }) => {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    disabled={hasAnswered}
                    key={index}
                    className={`btn btn-option ${
                        index === answer ? "answer" : ""
                    } ${
                        hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    onClick={() =>
                        dispatch({
                            type: "newAnswer",
                            payload: index,
                        })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
