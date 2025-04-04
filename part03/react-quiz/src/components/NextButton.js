import React from "react";

const NextButton = ({ dispatch, current, numQuestions }) => {
    return (
        <button
            className="btn btn-ui"
            onClick={() =>
                current === (numQuestions - 1)
                    ? dispatch({ type: "finish" })
                    : dispatch({ type: "moveToNext" })
            }
        >
            {current === (numQuestions - 1) ? "Finish" : "Next"}
        </button>
    );
};

export default NextButton;
