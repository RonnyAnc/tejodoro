import {
  JoinPomodoroSessionCommand,
  JoinPomodoroSessionCommandHandler,
} from '../src/application/JoinPomodoroCommandHandler';
import { SessionRepository } from '../src/domain/SessionRepository';

describe('Join Pomodoro', () => {
  const startDate = Date.now();
  const clock = { now: () => startDate };

  it('should join a new pomodoro when it does not exist', async () => {
    const pomodoroRepository = {
      get: () => null,
      save: jest.fn(),
    } as SessionRepository;
    const joinPomodoro = new JoinPomodoroSessionCommandHandler(pomodoroRepository, clock);

    const pomodoroSession = await joinPomodoro.handle(new JoinPomodoroSessionCommand('my_pomodoro_session', 'ronny'));

    const expectedSession = {
      name: 'my_pomodoro_session',
      status: {
        name: 'pomodoro',
        endTime: startDate + 25 * 60000,
      },
      participants: ['ronny'],
    };
    expect(pomodoroRepository.save).toHaveBeenCalledWith(expectedSession);
    expect(pomodoroSession).toEqual(expectedSession);
  });

  it('should join an existing session', async () => {
    const existingSession = {
      name: 'my_pomodoro_session',
      status: {
        name: 'pomodoro',
        endTime: Date.now() + 25 * 60000,
      },
      participants: ['ronny'],
    };
    const sessionRepository = {
      get: async () => existingSession,
      save: jest.fn(),
    } as SessionRepository;
    const joinPomodoro = new JoinPomodoroSessionCommandHandler(sessionRepository, clock);

    const pomodoroSession = await joinPomodoro.handle(new JoinPomodoroSessionCommand('my_pomodoro_session', 'ronny'));

    expect(sessionRepository.save).not.toHaveBeenCalled();
    expect(pomodoroSession).toEqual(existingSession);
  });
});
