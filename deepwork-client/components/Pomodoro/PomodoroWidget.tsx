import { useContext, memo, useEffect } from "react";
import { Context } from "../../context/Context";
import TaskTimer from "./TaskTimer";
import { actionType } from "../../reducers/reducerActionTypes";

const PomodoroWidget = memo(() => {
    const { state, dispatch } = useContext(Context);
    const { timerRunning, timeLeft, timerMode } = state;

    useEffect(() => {
        const settingsTimeString = localStorage.getItem("deep-work:settings:time");
        if(settingsTimeString) {
            let timeSettings = JSON.parse(settingsTimeString);
            dispatch({...state, timeSettings: timeSettings, type: actionType.update_time_settings})
        }
    }, [])

    const handleModeChange = (id: string) => {
        dispatch({ ...state, type: actionType.change_timer_mode, timerMode: id, toastShow: true });
    }

    const modeButtons = Object.entries(state.timeSettings).map(([key, value]) => {
        return (
            <div key={key} className="col-span-1 text-center cursor-pointer">
                <div id={key} className={`mx-auto my-3 w-10/12 h-5/8 text-center hover:bg-gray-600 font-bold rounded py-1 text-zinc-800 dark:text-white ${key == timerMode ? "bg-gray-500 dark:bg-gray-900" : ""}`}
                    onClick={() => handleModeChange(key)}
                >
                    <h1>{value.name}</h1>
                </div>
            </div>
        )
    });

    return (
        <div className="border-2 bg-opacity-90 rounded-lg bg-gray-400 dark:border-gray-900 dark:bg-gray-800">
            <div className="cursor-move handle h-2"></div>
            <div className="h-72 w-96 grid grid-rows-5 ">
                <div className="row-span-1 grid grid-cols-3">
                    {modeButtons}
                </div>
                <div className="row-span-4 text-center">
                    <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} timerMode={timerMode} />
                </div>
            </div>
            <div className="cursor-move handle h-2"></div>
        </div>
    );
});

PomodoroWidget.displayName = "PomodoroWidget";

export default PomodoroWidget 