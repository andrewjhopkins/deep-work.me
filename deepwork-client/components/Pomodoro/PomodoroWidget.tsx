import { useContext, memo, useEffect } from "react";
import { PomodoroContext } from "../../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo(() => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = state;

    useEffect(() => {
        if(localStorage.getItem("deep-work:settings:time")) {
            let timeSettings = JSON.parse(localStorage.getItem("deep-work:settings:time"));
            dispatch({...state, timeSettings: timeSettings, type: "update_time_settings"})
        }
    }, [])

    const handleModeChange = (id) => {
        dispatch({ ...state, type: "change_timer_mode", timerMode: id, toastShow: true });
    }

    const modeButtons = Object.entries(state.timeSettings).map(([key, value]) => {
        return (
            <div key={key} className="col-span-1 text-center cursor-pointer">
                <div id={key} className={`text-white mx-auto my-3 w-10/12 h-5/8 text-center hover:bg-gray-600 text-white font-bold rounded py-1 ${key == timerMode ? "bg-gray-900" : ""}`}
                    onClick={() => handleModeChange(key)}
                >
                    <h1>{value.name}</h1>
                </div>
            </div>
        )
    });

    return (
        <div className="border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
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