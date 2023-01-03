import { useContext, useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../../utils/date";
import useTimer from "../../utils/useTimer";
import { Context } from "../../context/Context";
import { actionType } from "../../reducers/reducerActionTypes";

interface ITaskTimerProps {
    timerRunning: boolean
    timeLeft: number, 
    timerMode: string,
}

const TaskTimer = memo((props: ITaskTimerProps) => {
    const callback = useCallback(() => {
        new Audio("/finish.mp3").play();
        dispatch({ ...state, type: actionType.timer_complete});
    }, []);

    const { state, dispatch } = useContext(Context);
    const { soundEnabled } = state;
    const { timerRunning, timeLeft } = props;
    const [stateTimerStarted, setStateTimerStarted] = useState(timerRunning);
    const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft, callback);

    useEffect(() => {
        const soundEnabledString: string | null = localStorage.getItem("deep-work:settings:sound")
        if (soundEnabledString != null) {
            let soundEnabled: boolean = JSON.parse(soundEnabledString);
            dispatch({...state, soundEnabled, type: actionType.update_sound_setting})
        }
    }, [])

    const startButtonClickHandler = () => {
        if (timerRunning) {
            if (soundEnabled) {
                new Audio("/stop.mp3").play();
            }
            
            dispatch({ ...state, type: actionType.stop_timer, timeLeft: seconds, toastShow: true });
        }
        else {
            if (soundEnabled) {
                new Audio("/start.mp3").play();
            }

            dispatch({ ...state, type: actionType.start_timer, timeLeft: seconds, toastShow: true });
        }
    }

    const resetButtonClickHandler = () => {
        dispatch({ ...state, type: actionType.reset_timer, toastShow: true });
        setSeconds(timeLeft);
    }
    
    useEffect(() => {
        setStateTimerStarted(timerRunning);
    }, [timerRunning])

    useEffect(() => {
        setSeconds(timeLeft);
    }, [timeLeft, setSeconds])

    const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
    return (
        <div className="h-full grid grid-row-6">
            <title>{timerRunning ? timerString : "deep-work.me"}</title>
            <div className="my-5 text-8xl timer-label row-span-5 text-zinc-800 dark:text-white">
                {timerString}
            </div>

            <div className="grid grid-cols-2 row-span-1">
                <div className="col-span-1">
                    <div className={`${seconds == 0 ? "pointer-events-none opacity-60" : ""} my-2 text-center w-7/12 m-auto ${timerRunning ? "bg-indigo-600 dark:bg-indigo-900 hover:bg-indigo-800" : "bg-blue-600 dark:bg-blue-900 hover:bg-blue-800"} text-zinc-800 dark:text-white font-bold rounded py-1 cursor-pointer`}
                        onClick={startButtonClickHandler}>
                        <h1>{timerRunning ? "Stop" : "Start"}</h1>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className={`${timerRunning ? "pointer-events-none opacity-60" : ""} my-2 text-center w-7/12 m-auto bg-red-600 dark:bg-red-900 hover:bg-red-800 text-zinc-800 dark:text-white font-bold rounded py-1 cursor-pointer`}
                        onClick={resetButtonClickHandler}>
                        <h1>Reset</h1>
                    </div>
                </div>
            </div>
        </div>
    )
});

TaskTimer.displayName = "TaskTimer";

export default TaskTimer;

