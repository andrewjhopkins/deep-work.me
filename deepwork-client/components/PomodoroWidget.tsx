import { Main } from "next/document";
import { useState, useEffect, useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const PomodoroWidget = memo((props) => {
    const { state, dispatch } = useContext(PomodoroContext);
    const { timerRunning, timeLeft } = state;

    const onClickHandler = () => {
        if (timerRunning) {
            dispatch({type: "stop_timer"});
        }
        else {
            dispatch({type: "start_timer"});
        }
    }

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

            <div className="row-span-2 text-center">
                <TaskTimer timerRunning={timerRunning} timeLeft={timeLeft} />
            </div>

            <div className="row-span-1 grid grid-cols-2">
                <div className="col-span-1">
                    <div className="text-center h-3/4 w-7/12 m-auto bg-blue-500 hover:bg-blue-600 text-white font-bold rounded py-1"
                        onClick={onClickHandler}
                    >
                        <h1 className="my-1">Start</h1>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-center h-3/4 w-7/12 m-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded py-1">
                        <h1 className="my-1">Reset</h1>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PomodoroWidget 