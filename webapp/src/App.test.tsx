import React from "react";
import { screen } from '@testing-library/react';
import { fireEvent, render } from "@testing-library/react";
import App from "./App";

function aCompleteTimer() {
    return (callback: Function, milliseconds: number) => callback();
}

function aTimerStartedXMinutesAgo(minutesAgo: number) {
    let seconds = 0;
    return (callback: Function, _: number) => {
        if (seconds / 60 === minutesAgo) {
            return
        }
        callback();
        seconds++;
    }

}

describe("App test", () => {
    test('should update countdown when one second passes', () => {
        render(<App pomodoroDurationInMinutes={5} schedule={aTimerStartedXMinutesAgo(1)}/>);

        const startButton = screen.getByTestId("start-pomodoro");
        fireEvent.click(startButton);

        expect(screen.getByTestId("timer")).toHaveTextContent('04:00')
        expect(screen.queryByTestId("start-pomodoro")).not.toBeInTheDocument()
        expect(screen.queryByTestId("start-break")).not.toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'stop-timer'})).toBeInTheDocument()
    })

    test("should reach 0 when pomodoro timer ends", () => {
        render(<App pomodoroDurationInMinutes={5} schedule={aCompleteTimer()}/>);

        const startButton = screen.getByTestId("start-pomodoro");
        fireEvent.click(startButton);

        expect(screen.queryByTestId("timer")).not.toBeInTheDocument()
        expect(screen.getByTestId("start-pomodoro")).toBeInTheDocument();
        expect(screen.getByTestId("start-break")).toBeInTheDocument();
    });

    test("should allow to take a break after finishing a pomodoro", () => {
        render(<App breakDurationInMinutes={2} schedule={aTimerStartedXMinutesAgo(1)}/>);

        const startBreakButton = screen.getByTestId("start-break");
        fireEvent.click(startBreakButton);

        expect(screen.getByTestId("timer")).toHaveTextContent('01:00')
    });
});
