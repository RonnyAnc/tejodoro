import { PomodoroSession } from './PomodoroSession';

export interface PomodoroRepository {
  get(pomodoroName: string): PomodoroSession | null;
  save(pomodoroSession: PomodoroSession): void;
}
