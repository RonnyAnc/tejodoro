import { Pomodoro } from './Pomodoro';

export interface PomodoroRepository {
  find(name: string): Promise<Pomodoro>;
}
