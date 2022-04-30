import React, { useState, useEffect } from "react";
import "./App.css";

type SessionStatus =
    | "TimerRunning"
    | "Idle";

const DEFAULT_POMODORO_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;

type Props = {
    pomodoroDurationInMinutes?: number,
    breakDurationInMinutes?: number,
    schedule(callback: Function, milliseconds: number): void  
}


const App: React.FunctionComponent<Props> = ({ 
    schedule, 
    pomodoroDurationInMinutes = DEFAULT_POMODORO_DURATION,
    breakDurationInMinutes = DEFAULT_BREAK_DURATION
}) => {
    const pomodoroDurationInSeconds = pomodoroDurationInMinutes * 60
    const breakDurationInSeconds = breakDurationInMinutes * 60
    const [countdownInSeconds, setCountdown] = useState<number>(
        pomodoroDurationInSeconds
    );
    const [sessionStatus, setSessionStatus] =
        useState<SessionStatus>("Idle");

    useEffect(() => {
        if (sessionStatus === "TimerRunning") {
            if (countdownInSeconds <= 0) {
                setSessionStatus("Idle");
            }
            countdownInSeconds > 0 &&
                schedule(() => {
                    setCountdown(countdownInSeconds - 1);
                }, 1000);
        }
    }, [countdownInSeconds, sessionStatus, schedule]);

    function startPomodoro() {
        setSessionStatus("TimerRunning");
    }

    function startBreak() {
        setCountdown(breakDurationInSeconds)
        setSessionStatus("TimerRunning");
    }

    return (
        <div className="App">
            {sessionStatus !== "TimerRunning" && (
                <>
                    <button
                        data-testid="start-pomodoro"
                        onClick={startPomodoro}
                    >
                        Start pomodoro
                    </button>
                    <button data-testid="start-break" onClick={startBreak} />
                </>
            )}
            {sessionStatus === "TimerRunning" && (
                <>
                    <div data-testid="timer">
                        {new Date(countdownInSeconds * 1000).toISOString().substring(14, 19)}
                    </div>
                    <button aria-label="stop-timer">Stop timer</button>
                </>
            )}
        </div>
    );
};

export default App;
