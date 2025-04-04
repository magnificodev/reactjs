import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return <div className="timer">{formatTime(secondsRemaining)}</div>;
};

export default Timer;

const formatTime = (seconds) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
