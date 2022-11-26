import { useReducer, createContext } from 'react';
import reducer from "../reducers/reducer";

export const PomodoroContext = createContext({});

const initialState = {
    tasks: [],
    activeTaskId: -1
};

/**
 * Before the Grid Component is rendered, check if there is any saved data in local storage and initialise
 * the state with it.
 * Alternatively, you can implement this logic inside the onGridReady event on the Grid Component
 */
const init = (initial) => {
    return initial;
}

export const PomodoroProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    return (<PomodoroContext.Provider value={{ dispatch }}>
        {children}
    </PomodoroContext.Provider>
    );
}

