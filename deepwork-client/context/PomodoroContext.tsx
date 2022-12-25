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

export interface ITaskItem {
    id: string,
    name: string,
    pomodoros: number,
    pomodoros_complete: number,
    finished: boolean,
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
    timeSettings: {[key in keyof typeof TimeMode]: timeSetting},

    taskItems: ITaskItem[],
    backgroundEffect: string,
    currentTask: ITaskItem
}

const timeSettingsClone = structuredClone(timeSettingsDefault);

const sampleTasks: ITaskItem[] = [
    {
        "id": "18f6d18f-efea-4866-9609-584dc5dfcda5",
        "name": "task to do 1",
        "pomodoros": 2,
        "pomodoros_complete": 0,
        "finished": false
    },
    {
        "id": "18f6d18f-efea-4866-9609-584dc5dfcda5",
        "name": "task to do 2",
        "pomodoros": 3,
        "pomodoros_complete": 1,
        "finished": false
    }
]

const initialState: IState = {
    timerRunning: false,
    timeLeft: timeSettingsClone[TimeMode.pomodoro].initialTime,
    timerMode: TimeMode.pomodoro,

    toastMessage: "",
    toastShow: false,
    toastColor: "blue",

    showSettings: false,
    timeSettings: timeSettingsClone,

    taskItems: sampleTasks,
    backgroundEffect: "None",
    currentTask: {} as ITaskItem
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
    timeSettings: {[name: string]: timeSetting},
    taskItems: ITaskItem[],
    backgroundEffect: string,
    currentTask: ITaskItem,
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