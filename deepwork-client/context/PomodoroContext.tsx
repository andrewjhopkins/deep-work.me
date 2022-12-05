import React, { useReducer, createContext } from 'react';
import reducer from "../reducers/reducer";

interface timeSetting {
    name: string,
    initialTime: number
}

export enum TimeMode {
    pomodoro = "pomodoro",
    short_break = "short_break",
    long_break = "long_break"
}

export const timeSettingsDefault: {[key in keyof typeof TimeMode]: timeSetting} = {
    "pomodoro": {
        name: "Pomodoro",
        initialTime: 1500
    },
    "short_break": {
        name: "Short Break",
        initialTime: 300,
    },
    "long_break": {
        name: "Long Break",
        initialTime: 600
    }
};

interface IState {
    timerRunning: boolean,
    timeLeft: number,
    timerMode: TimeMode,

    toastMessage: string,
    toastShow: boolean,
    toastColor: string,

    showSettings: boolean,
    timeSettings: {[key in keyof typeof TimeMode]: timeSetting}
}

const timeSettingsClone = structuredClone(timeSettingsDefault);

const initialState: IState = {
    timerRunning: false,
    timeLeft: timeSettingsClone[TimeMode.pomodoro].initialTime,
    timerMode: TimeMode.pomodoro,

    toastMessage: "",
    toastShow: false,
    toastColor: "blue",

    showSettings: false,
    timeSettings: timeSettingsClone,
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
    showSettings: boolean,
    timeSettings: {[name: string]: timeSetting}
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

