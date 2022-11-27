import { useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state } = useContext(PomodoroContext);
    const { timerRunning, timeLeft } = state;

    return (
        <div className="m-10 h-80 w-96 grid grid-rows-6 border-2">
            <div className="row-span-2 grid grid-cols-2">
                <div className="col-span-1">
                    <div className="mx-auto my-5 w-3/4 h-1/2 border-2 text-center">
                        <h1 className="my-2">Short Break</h1>
                    </div>
                </div>
                <div className="col-span-1 text-center">
                    <div className="mx-auto my-5 w-3/4 h-1/2 border-2 text-center">
                        <h1 className="my-2">Long Break</h1>
                    </div>
                </div>
            </div>
            <div className="row-span-1 text-center">
                <h1>Session</h1>
            </div>

            <div className="row-span-3 text-center">
                <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} />
            </div>
        </div>
    );
});

export default PomodoroWidget 