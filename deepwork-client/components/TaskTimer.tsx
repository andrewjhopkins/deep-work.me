import { useContext, useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../utils/date";
import useTimer from "../utils/useTimer";
import { PomodoroContext } from "../context/PomodoroContext";

interface TaskTimerProps {
    timerRunning: boolean
    timeLeft: number, 
}

const TaskTimer = memo((props: TaskTimerProps) => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft } = props;
    const [stateTimerStarted, setStateTimerStarted] = useState(timerRunning);

    const onClickHandler = () => {
        if (timerRunning) {
            dispatch({type: "stop_timer", timeLeft: seconds});
        }
        else {
            dispatch({type: "start_timer", timeLeft: seconds});
        }
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
        <div className="grid grid-rows-4">
            <div className="text-7xl timer-label row-span-3">
                {timerString}
            </div>

            <div className="grid grid-cols-2 row-span-1">
                <div className="col-span-1">
                    <div className="text-center w-7/12 m-auto bg-blue-500 hover:bg-blue-600 text-white font-bold rounded py-1"
                        onClick={onClickHandler}
                    >
                        <h1>{timerRunning ? "Stop" : "Start"}</h1>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-center w-7/12 m-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded py-1">
                        <h1>Reset</h1>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default TaskTimer;

