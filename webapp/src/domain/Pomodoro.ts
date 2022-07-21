export class Pomodoro {
  readonly name: string;
  readonly status: { name: string; endTime: Date };
  readonly participants: Array<string>;

  constructor(data: {
    name: string;
    status: { name: string; endTime: Date };
    participants: Array<string>;
  }) {
    const { name, status, participants } = data;
    this.name = name;
    this.status = status;
    this.participants = participants;
  }
}
