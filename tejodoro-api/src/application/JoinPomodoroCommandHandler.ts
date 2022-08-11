import { PomodoroRepository } from '../domain/PomodoroRepository';
import { Clock } from '../domain/Clock';
import { PomodoroSession } from '../domain/PomodoroSession';

export class JoinPomodoroSessionCommand {
  constructor(public sessionName: string, public participantId: string) {}
}

export class JoinPomodoroSessionCommandHandler {
  constructor(
    private pomodoroRepository: PomodoroRepository,
    private clock: Clock
  ) {}

  handle(command: JoinPomodoroSessionCommand): PomodoroSession {
    return {
      name: '',
      status: {
        name: '',
        endTime: 1,
      },
      participants: [],
    };
  }
}
