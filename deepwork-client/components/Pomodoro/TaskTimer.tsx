import { useContext, useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../../utils/date";
import useTimer from "../../utils/useTimer";
import { PomodoroContext } from "../../context/PomodoroContext";

interface TaskTimerProps {
    timerRunning: boolean
    timeLeft: number, 
    timerMode: string,
}

const TaskTimer = memo((props: TaskTimerProps) => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft, timerMode } = props;
    const [stateTimerStarted, setStateTimerStarted] = useState(timerRunning);

    const startButtonClickHandler = () => {
        if (timerRunning) {
            dispatch({ type: "stop_timer", timerRunning: timerRunning, timeLeft: seconds, timerMode: timerMode, toastMessage: "Timer Stopped" });
        }
        else {
            dispatch({ type: "start_timer", timerRunning: timerRunning, timeLeft: seconds, timerMode: timerMode, toastMessage: "Timer Started" });
        }
    }

    const resetButtonClickHandler = () => {
        dispatch({ type: "stop_timer", timerRunning: timerRunning, timeLeft: -1, timerMode: timerMode, toastMessage: "Reset Timer" })
    }
    
    const callback = useCallback(() => {
        setStateTimerStarted(false)
    }, []);

    const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft, callback);

    useEffect(() => {
        setStateTimerStarted(timerRunning);
    }, [timerRunning])

    useEffect(() => {
        setSeconds(timeLeft);
    }, [timeLeft, setSeconds])

    const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
    return (
        <div className="h-full grid grid-row-6">
            <div className="my-5 text-8xl timer-label row-span-5">
                {timerString}
            </div>

            <div className="grid grid-cols-2 row-span-1">
                <div className="col-span-1">
                    <div className="my-2 text-center w-7/12 m-auto bg-blue-500 hover:bg-blue-600 text-white font-bold rounded py-1"
                        onClick={startButtonClickHandler}>
                        <h1>{timerRunning ? "Stop" : "Start"}</h1>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="my-2 text-center w-7/12 m-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded py-1"
                        onClick={resetButtonClickHandler}>
                        <h1>Reset</h1>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default TaskTimer;

