import React, {useState, useEffect} from "react";
import "./App.css";
import Countdown from 'react-countdown';

const App: React.FunctionComponent = () => {
    const [endTime, setEndtime] = useState<Date>();
    const [participants, setParticipants] = useState<Array<{ username: string }>>([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEJODORO_API_URL}`)
          .then((response) => response.json())
          .then((session) => {
            setEndtime(session.status.endTime);
            setParticipants(session.participants)
          });
      }, []);

    return (
        <div>
            {endTime && <Countdown date={endTime} />}
            <div>
                Participants:
                {
                    participants.map(participant =>
                        <p>
                        {participant.username}
                        </p>
                    )
                }
            </div>

        </div>
    );
};

export default App;
