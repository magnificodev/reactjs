import React from "react";

const Progress = ({ current, numQuestions, points, totalPoints, answer }) => {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={current + Number(answer !== null)}
            ></progress>
            <p>
                Question <strong>{current + 1}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {totalPoints} points
            </p>
        </header>
    );
};

export default Progress;
