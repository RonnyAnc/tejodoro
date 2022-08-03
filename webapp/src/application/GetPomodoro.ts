import { PomodoroRepository } from '../domain/PomodoroRepository';

export class GetPomodoro {
  constructor(private repository: PomodoroRepository) {}

  async run(name: string) {
    return this.repository.find(name);
  }
}
