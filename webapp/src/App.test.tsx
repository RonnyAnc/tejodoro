import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    test("should allow to start a pomodoro", () => {
        const { getByTestId, queryByTestId } = render(<App />);

        const startButton = getByTestId("start-pomodoro");
        fireEvent.click(startButton);
        expect(queryByTestId("start-pomodoro")).not.toBeInTheDocument();
        expect(queryByTestId("start-break")).not.toBeInTheDocument();
        jest.advanceTimersByTime(1000 * 60);
        jest.advanceTimersByTime(1000 * 60);
        expect(getByTestId("pomodoro-counter")).toContain("24");
        jest.runOnlyPendingTimers();

        getByTestId("pomodoro-finished-message");
    });

    test("should allow to take a break after finishing a pomodoro", () => {
        const { getByTestId, queryByTestId } = render(<App />);

        const startButton = getByTestId("start-pomodoro");
        expect(queryByTestId("start-break")).not.toBeInTheDocument();
        fireEvent.click(startButton);
        jest.runOnlyPendingTimers();

        const startBreakButton = getByTestId("start-break");
        fireEvent.click(startBreakButton);
        jest.runOnlyPendingTimers();

        getByTestId("break-finished-message");
    });
});
