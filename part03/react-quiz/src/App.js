import { useEffect, useReducer, useMemo } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import RestartButton from "./components/RestartButton";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
    questions: [],
    status: "loading", // "loading", "error", "ready", "active", "finished"
    current: 0,
    points: 0,
    answer: null,
    highscore: 0,
    secondsRemaining: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * 30,
            };
        case "newAnswer":
            const question = state.questions[state.current];
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "moveToNext":
            return { ...state, current: state.current++, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highscore: state.highscore,
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        default:
            throw new Error("Action unknown");
    }
};

const App = () => {
    const [
        {
            questions,
            status,
            current,
            answer,
            points,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const totalPoints = useMemo(
        () => questions.reduce((acc, val) => acc + val.points, 0),
        [questions]
    );

    useEffect(() => {
        const fecthQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/questions");
                const questions = await response.json();
                dispatch({ type: "dataReceived", payload: questions });
            } catch (err) {
                dispatch({ type: "dataFailed" });
            }
        };
        fecthQuestions();
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === " loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            current={current}
                            numQuestions={numQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[current]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            {status === "active" && (
                                <Timer
                                    dispatch={dispatch}
                                    secondsRemaining={secondsRemaining}
                                />
                            )}
                            {answer !== null && (
                                <NextButton
                                    dispatch={dispatch}
                                    current={current}
                                    numQuestions={numQuestions}
                                />
                            )}
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <>
                        <FinishScreen
                            points={points}
                            totalPoints={totalPoints}
                            highscore={highscore}
                        />
                        <RestartButton dispatch={dispatch} />
                    </>
                )}
            </Main>
        </div>
    );
};

export default App;
