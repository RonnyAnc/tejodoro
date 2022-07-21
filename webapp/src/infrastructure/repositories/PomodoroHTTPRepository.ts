import { Pomodoro } from '../../domain/Pomodoro';
import { PomodoroRepository } from '../../domain/PomodoroRepository';

type PomodoroDTO = {
  name: string;
  status: { name: string; endTime: Date };
  participants: Array<string>;
};

export class PomodoroHTTPRepository implements PomodoroRepository {
  async find(name: string): Promise<Pomodoro> {
    fetch(`${process.env.REACT_APP_TEJODORO_API_URL}`).then((response) =>
      response.json()
    );
    const response = await fetch(`${process.env.REACT_APP_TEJODORO_API_URL}`);
    const rawPomodoro = (await response.json()) as PomodoroDTO;
    return new Pomodoro(rawPomodoro);
  }
}
