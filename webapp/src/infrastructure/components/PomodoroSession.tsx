import React, { useEffect, useState } from 'react';
import { GetPomodoro } from '../../application/GetPomodoro';
import styled from 'styled-components';
import { Countdown } from './Countdown';

type Props = {
  getPomodoro: GetPomodoro;
}

export const PomodoroSession: React.FunctionComponent<Props> = ({ getPomodoro }) => {
  const [endTime, setEndtime] = useState<Date>();
  const [participants, setParticipants] = useState<Array<string>>([]);
  useEffect(() => {
    getPomodoro.run('aPomodoro').then((pomodoro) => {
      setEndtime(pomodoro.status.endTime);
      setParticipants(pomodoro.participants);
    });
  }, [getPomodoro]);

  return (
    <Container>
      {endTime && <Countdown endTime={endTime}/>}
      <ParticipantList>
        <Title>Participants:</Title>
        {participants.map((participant) => (
          <li key={participant}>{participant}</li>
        ))}
      </ParticipantList>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 100px
`;

const ParticipantList = styled.div`
  padding: 50px;
`;

const Title = styled.p`
  font-weight: bold;
`;
