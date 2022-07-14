import React from 'react';
import './App.css';
import { GetPomodoro } from './application/GetPomodoro';
import { PomodoroSession } from './infrastructure/components/PomodoroSession';
import { PomodoroHTTPRepository } from './infrastructure/repositories/PomodoroHTTPRepository';

const getPomodoro = new GetPomodoro(new PomodoroHTTPRepository());

const App: React.FunctionComponent = () => <PomodoroSession getPomodoro={getPomodoro} />;

export default App;
