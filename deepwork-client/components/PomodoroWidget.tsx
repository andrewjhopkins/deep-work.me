import { stringify } from "querystring";
import { useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = state;

    interface mode {
        id: string
        displayName: string
    }

    const modes: mode[] = [{id: "pomodoro", displayName: "Pomodoro"}, {id: "short-break", displayName: "Short Break"}, {id: "long-break", displayName: "Long Break"}];

    const handleModeChange = () => {
        console.log("click");
    }

    const modeButtons = modes.map((mode: mode) => {
        return (
            <div className="col-span-1 text-center">
                <div id={mode.id} className={`mx-auto my-3 w-10/12 h-5/8 text-center hover:bg-gray-100 text-black font-bold rounded py-1 ${mode.id == "short-break" ? "bg-gray-300" : ""}`}
                    onClick={handleModeChange}
                >
                    <h1>{mode.displayName}</h1>
                </div>
            </div>
        )
    });

    return (
        <div className="m-10 h-72 w-96 grid grid-rows-5 border-2">
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