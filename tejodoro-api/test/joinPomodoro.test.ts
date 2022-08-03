describe("Join Pomodoro", () => {
    it("should join a new pomodoro when it does not exist", () => {
        const pomodoroRepository = {
            get: () => null,
            save: jest.fn()
        } as PomodoroRepository;
        const startDate = 1659547236412
        const clock = {
            now: () => startDate
        }
        
        const joinPomodoro = new JoinPomodoroSessionCommandHandler(
            pomodoroRepository, clock
        );

        const pomodoroSession = joinPomodoro.handle(
            new JoinPomodoroSessionCommand("my_pomodoro_session", "ronny")
        );
        expect(pomodoroSession).toEqual({
            name: "my_pomodoro_session",
            status: {
                name: "pomodoro",
                endTime: startDate + 25 * 60000,
            },
            participants: ["ronny"],
        });
    });
});
