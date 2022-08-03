import { Pomodoro } from '../../domain/Pomodoro';
import { GetPomodoro } from '../GetPomodoro';

describe('GetPomodoro', () => {
  it('should get a pomodoro', async () => {
    const aPomodoro = new Pomodoro({
      name: 'aPomodoro',
      status: { name: 'aStatus', endTime: new Date() },
      participants: ['aParticipant'],
    });
    const repository = { find: async (name: string) => aPomodoro };
    const service = new GetPomodoro(repository);

    const result = await service.run(aPomodoro.name);

    expect(result).toEqual(aPomodoro);
  });
});
