import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { GetPomodoro } from '../../application/GetPomodoro';
import { PomodoroHTTPRepository } from '../repositories/PomodoroHTTPRepository';

const getPomodoro = new GetPomodoro(new PomodoroHTTPRepository());

export const Pomodoro: React.FunctionComponent = () => {
  const [endTime, setEndtime] = useState<Date>();
  const [participants, setParticipants] = useState<Array<string>>([]);
  useEffect(() => {
    getPomodoro.run('aPomodoro').then((pomodoro) => {
      setEndtime(pomodoro.status.endTime);
      setParticipants(pomodoro.participants);
    });
  }, []);

  return (
    <div>
      {endTime && <Countdown date={endTime} />}
      <div>
        Participants:
        {participants.map((participant) => (
          <li key={participant}>{participant}</li>
        ))}
      </div>
    </div>
  );
};
