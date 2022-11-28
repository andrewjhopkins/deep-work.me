import { useContext, memo } from "react";
import { PomodoroContext } from "../../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = state;

    interface mode {
        id: string
        displayName: string
    }

    const modes: mode[] = [{id: "pomodoro", displayName: "Pomodoro"}, {id: "short-break", displayName: "Short Break"}, {id: "long-break", displayName: "Long Break"}];

    const handleModeChange = (id) => {
        dispatch({ ...state, type: "change_timer_mode", timerMode: id, toastShow: true });
    }

    const modeButtons = modes.map((mode: mode) => {
        return (
            <div className="col-span-1 text-center">
                <div id={mode.id} className={`text-white mx-auto my-3 w-10/12 h-5/8 text-center hover:bg-gray-600 text-black font-bold rounded py-1 ${mode.id == timerMode ? "bg-gray-900" : ""}`}
                    onClick={() => handleModeChange(mode.id)}
                >
                    <h1>{mode.displayName}</h1>
                </div>
            </div>
        )
    });

    return (
        <div className="m-10 h-72 w-96 grid grid-rows-5 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
            <div className="row-span-1 grid grid-cols-3">
                {modeButtons}
            </div>
            <div className="row-span-4 text-center">
                <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} timerMode={timerMode} />
            </div>
        </div>
    );
});

export default PomodoroWidget 