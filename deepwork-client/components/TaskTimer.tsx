import { useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../utils/date";
import useTimer from "../utils/useTimer";

interface TaskTimerProps {
    timerRunning: boolean
    timeLeft: number, 
}

const TaskTimer = memo((props: TaskTimerProps) => {
    const { timerRunning, timeLeft } = props;
    const [stateTimerStarted, setStateTimerStarted] = useState(timerRunning);
    
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
        <div className="text-7xl timer-label">{timerString}</div>
    )
});

export default TaskTimer;

