import { useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = state;

    return (
        <div className="m-10 h-72 w-96 grid grid-rows-5 border-2">
            <div className="row-span-1 grid grid-cols-3">
                <div className="col-span-1">
                    <div className="mx-auto my-3 w-3/4 h-1/2 text-center">
                        <h1>Work</h1>
                    </div>
                </div>
                <div className="col-span-1 text-center">
                    <div className="mx-auto my-3 w-3/4 h-1/2 text-center">
                        <h1>Long Break</h1>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="mx-auto my-3 w-3/4 h-1/2 text-center">
                        <h1>Short Break</h1>
                    </div>
                </div>
            </div>
            <div className="row-span-4 text-center">
                <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} timerMode={timerMode} />
            </div>
        </div>
    );
});

export default PomodoroWidget 