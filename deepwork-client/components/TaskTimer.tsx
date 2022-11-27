import { useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../utils/date";
import useTimer from "../utils/useTimer";

interface TaskTimerProps {
    timeLeft: number, 
    timerStarted: boolean
}

const TaskTimer = memo((props: TaskTimerProps) => {
    const { timeLeft, timerStarted } = props;
    const [stateTimerStarted, setStateTimerStarted] = useState(timerStarted);

    const callback = useCallback(() => {
        setStateTimerStarted(false)
    }, []);

    const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft, callback);

    useEffect(() => {
        setStateTimerStarted(timerStarted);
    }, [timerStarted])

    useEffect(() => {
        setSeconds(timeLeft);
    }, [timeLeft, setSeconds])

    const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
    return (
        <div className="text-7xl timer-label">{timerString}</div>
    )
});

export default TaskTimer;

