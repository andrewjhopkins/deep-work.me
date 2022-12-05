import React, { useReducer, createContext } from 'react';
import { defaultTimes } from '../utils/constants';
import reducer from "../reducers/reducer";

interface timeSetting {
    name: string,
    initialTime: number
}

const timeSettingsDefault: {[name: string]: timeSetting} = {
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
    timerMode: string,

    toastMessage: string,
    toastShow: boolean,
    toastColor: string,

    showSettings: boolean,
    timeSettings: {[name: string]: timeSetting}
}

const initialState: IState = {
    timerRunning: false,
    timeLeft: defaultTimes["pomodoro"],
    timerMode: "pomodoro",

    toastMessage: "",
    toastShow: false,
    toastColor: "blue",

    showSettings: false,
    timeSettings: timeSettingsDefault,
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

