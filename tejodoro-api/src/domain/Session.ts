export enum SessionStatus {
  POMODORO = 'pomodoro',
  BREAK = 'break',
}
export type Session = {
  name: string;
  status: {
    name: SessionStatus;
    endTime: number;
  };
  participants: string[];
};
