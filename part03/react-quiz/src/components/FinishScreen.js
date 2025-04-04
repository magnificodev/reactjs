import React from "react";

const scoreEmojis = [
    "💀",
    "😵",
    "😢",
    "😞",
    "😐",
    "🙂",
    "😀",
    "😎",
    "🔥",
    "👑",
];

const FinishScreen = ({ points, totalPoints, highscore }) => {
    const percentage = ((points / totalPoints) * 100).toFixed(2);
    let emoji = scoreEmojis[Math.ceil(percentage / 10) - 1];

    return (
        <>
            <p className="result">
                <span>{emoji}</span>
                You scored <strong>{points}</strong> out of {totalPoints} (
                {percentage}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
        </>
    );
};

export default FinishScreen;
