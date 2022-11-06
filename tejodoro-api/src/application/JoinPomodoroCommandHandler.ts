import { SessionRepository } from '../domain/SessionRepository';
import { Clock } from '../domain/Clock';
import { Session, SessionStatus } from '../domain/Session';

export class JoinPomodoroSessionCommand {
  constructor(readonly sessionName: string, readonly participantId: string) {}
}

export class JoinPomodoroSessionCommandHandler {
  constructor(private pomodoroRepository: SessionRepository, private clock: Clock) {}

  async handle(command: JoinPomodoroSessionCommand): Promise<Session> {
    const existingSession = await this.pomodoroRepository.get(command.sessionName);
    if (existingSession) {
      return existingSession;
    }

    const sessionDuration = 25;
    const session = {
      name: command.sessionName,
      status: {
        name: SessionStatus.POMODORO,
        endTime: this.clock.now() + sessionDuration * 60000,
      },
      participants: [command.participantId],
    };
    this.pomodoroRepository.save(session);
    return session;
  }
}
