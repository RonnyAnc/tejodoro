import React from 'react';
import { render, screen } from '@testing-library/react';
import { PomodoroSession } from '../PomodoroSession';
import { GetPomodoro } from '../../../application/GetPomodoro';
import { Pomodoro } from '../../../domain/Pomodoro';

describe('Pomodoro should', () => {
  it('show participants', async () => {
    const participants = ['participant1', 'participant2'];
    const aPomodoro = new Pomodoro({
      name: 'aPomodoro',
      status: { name: 'aStatus', endTime: new Date() },
      participants
    });
    const getPomodoroDouble = { run: async () => aPomodoro } as unknown as GetPomodoro;

    render(<PomodoroSession getPomodoro={getPomodoroDouble} />);

    await screen.findByText(participants[0]);
    await screen.findByText(participants[1]);
  });

  it('show the countdown with the session duration', async () => {
    const sessionDurationInMinutes = 30;
    const thirtyMinutesFromNow = new Date(new Date().getTime() + sessionDurationInMinutes * 60 * 1000);
    const aPomodoro = new Pomodoro({
      name: 'aPomodoro',
      status: { name: 'aStatus', endTime: thirtyMinutesFromNow },
      participants: ['participant1', 'participant2']
    });
    const getPomodoroDouble = { run: async () => aPomodoro } as unknown as GetPomodoro;

    render(<PomodoroSession getPomodoro={getPomodoroDouble} />);

    await screen.findByText(`${sessionDurationInMinutes}:0`);
  });
});
