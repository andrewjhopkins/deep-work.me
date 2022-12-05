import { useContext, memo } from "react";
import { PomodoroContext } from "../../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = state;

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
        <div className="h-72 w-96 grid grid-rows-5 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
            <div className="row-span-1 grid grid-cols-3">
                {modeButtons}
            </div>
            <div className="row-span-4 text-center">
                <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} timerMode={timerMode} />
            </div>
        </div>
    );
});

PomodoroWidget.displayName = "PomodoroWidget";

export default PomodoroWidget 