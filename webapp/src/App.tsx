import React, { useState, useEffect } from "react";
import "./App.css";

type SessionStatus =
    | "NotStarted"
    | "PomodoroRunning"
    | "PomodoroFinished"
    | "BreakRunning"
    | "BreakFinished";

const DEFAULT_POMODORO_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;

const App: React.FunctionComponent = () => {
    const [countdownInSeconds, setCountdown] = useState<number>(
        DEFAULT_POMODORO_DURATION * 60
    );
    const [sessionStatus, setSessionStatus] =
        useState<SessionStatus>("NotStarted");

    useEffect(() => {
        countdownInSeconds > 0 &&
            setTimeout(() => {
                setCountdown(countdownInSeconds - 1);
            }, 1000);
    }, [countdownInSeconds]);

    function startPomodoro() {
        setSessionStatus("PomodoroRunning");
        const secondsInAMinute = 60;
        setInterval(() => {
            setSessionStatus("PomodoroFinished");
        }, DEFAULT_POMODORO_DURATION * 1000 * secondsInAMinute);
    }

    function startBreak() {
        const secondsInAMinute = 60;
        setSessionStatus("BreakRunning");
        setInterval(() => {
            setSessionStatus("BreakFinished");
        }, DEFAULT_BREAK_DURATION * 1000 * secondsInAMinute);
    }

    return (
        <div className="App">
            {sessionStatus !== "PomodoroRunning" && (
                <>
                    <button
                        data-testid="start-pomodoro"
                        onClick={startPomodoro}
                    >
                        Start pomodoro
                    </button>
                </>
            )}
            {sessionStatus === "PomodoroRunning" && (
                <>
                    <div data-testid="pomodoro-counter">
                        {countdownInSeconds / 60}
                    </div>
                </>
            )}
            {sessionStatus === "PomodoroFinished" && (
                <>
                    <p data-testid="pomodoro-finished-message">
                        Pomodoro has finished
                    </p>
                    <button data-testid="start-break" onClick={startBreak} />
                </>
            )}
            {sessionStatus === "BreakFinished" && (
                <p data-testid="break-finished-message">Break has finished</p>
            )}
        </div>
    );
};

export default App;
