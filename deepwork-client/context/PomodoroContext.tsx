import React, { useReducer, createContext } from 'react';
import reducer from "../reducers/reducer";

interface IState {
    timerRunning: boolean,
    timeLeft: number,
    timerMode: string
}

const initialState: IState = {
    timerRunning: false,
    timeLeft: 1500,
    timerMode: "pomodoro"
};

interface IContextProps {
  state: IState;
  dispatch: ({type}:{ type: string, timerRunning: boolean, timeLeft: number, timerMode: string, }) => void;
}

export const PomodoroContext = createContext({} as IContextProps);

const init = (initial) => {
    return initial;
}

export const PomodoroProvider = ({ children }) => {
    const [genericState, dispatch] = useReducer(reducer, initialState, init);
    const state = genericState as IState;

    return (<PomodoroContext.Provider value={{ state, dispatch }}>
        {children}
    </PomodoroContext.Provider>
    );
}

