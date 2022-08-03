interface PomodoroRepository {
    get(pomodoroName: string): PomodoroSession | null
    save(pomodoroSession: PomodoroSession): void
}

interface Clock {
    now(): number
}

class JoinPomodoroSessionCommand {
    constructor(public sessionName: string, public participantId: string) {}
}

type PomodoroSessionStatus = {};

type PomodoroSession = {
    name: string;
    status: {
        name: string;
        endTime: number;
    };
    participants: string[];
};

class JoinPomodoroSessionCommandHandler {
    constructor(private pomodoroRepository: PomodoroRepository, private clock: Clock) {}

    handle(command: JoinPomodoroSessionCommand): PomodoroSession {
        return {
            name: "",
            status: {
                name: "",
                endTime: 1,
            },
            participants: []
        }
    }
}