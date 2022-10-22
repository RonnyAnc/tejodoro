import React from 'react';
import { default as ReactCountdown } from 'react-countdown';
import styled from 'styled-components';

type Props = {
  endTime: Date;
}

export const Countdown: React.FunctionComponent<Props> = ({ endTime }) => {
  const renderer = ({
    minutes,
    seconds,
    completed
  }: { minutes: number; seconds: number; completed: boolean }) => {
    if (completed) {
      return <span>Session completed. Time for a break!</span>
    }

    return <Timer>{minutes}:{seconds}</Timer>
  }

  return (
    <ReactCountdown date={endTime} renderer={renderer}/>
  );
};

const Timer = styled.span`
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
