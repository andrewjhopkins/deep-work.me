import React, { useReducer, createContext } from 'react';
import { defaultTimes } from '../utils/constants';
import reducer from "../reducers/reducer";

interface IState {
    timerRunning: boolean,
    timeLeft: number,
    timerMode: string,

    toastMessage: string,
    toastShow: boolean,
    toastColor: string,
}

const initialState: IState = {
    timerRunning: false,
    timeLeft: defaultTimes["pomodoro"],
    timerMode: "pomodoro",

    toastMessage: "",
    toastShow: false,
    toastColor: "blue",
};

interface IContextProps {
  state: IState;
  dispatch: ({type}:{ 
    type: string, 
    timerRunning: boolean, 
    timeLeft: number, 
    timerMode: string, 
    toastMessage: string, 
    toastShow: boolean,
    toastColor: string,
}) => void;
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

