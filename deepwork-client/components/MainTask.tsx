import { Main } from "next/document";
import { useState, useEffect, useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskTimer from "./TaskTimer";

const ACTIVE_TASK_DEFAULT = { id: -1, timeLeft: 1500, timerStarted: false }

const MainTask = memo((props) => {

    const [activeTask, setActiveTask] = useState(ACTIVE_TASK_DEFAULT);
    const { timeLeft, timerStarted } = activeTask;

    return (
        <div className="main-task-background">
            <div className="main-task-container">
                <TaskTimer timeLeft={timeLeft} timerStarted={timerStarted}/>
            </div>
        </div>
    );
});

export default MainTask