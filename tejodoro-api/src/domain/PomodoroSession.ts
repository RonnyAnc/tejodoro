export type PomodoroSession = {
  name: string;
  status: {
    name: string;
    endTime: number;
  };
  participants: string[];
};
