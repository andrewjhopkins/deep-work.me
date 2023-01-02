import React from 'react'
import { ITaskItem } from '../../context/Context'
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { FaRedoAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ITaskListItemProps {
    task: ITaskItem,
    index: number,
    redoTask: Function,
    incrementPomodoroComplete: Function,
    toggleUpdatingTaskIndex: Function,
}

const TaskListItem = (props: ITaskListItemProps) => {
    const { task, index, redoTask, incrementPomodoroComplete, toggleUpdatingTaskIndex } = props;

    const taskComplete = task.pomodoros_complete >= task.pomodoros && task.pomodoros > 0;
    return(
        <div 
            className={`border border-gray-800 h-10 grid grid-cols-12 ${taskComplete ? "bg-green-900 text-white" : "bg-gray-700 text-white"}`}>
                <div onClick={() => {if (taskComplete) { redoTask(index) }}} className={`ml-2 flex items-center justify-center col-span-1 ${taskComplete && "cursor-pointer"}`}>
                    {taskComplete ?
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <FaRedoAlt />
                    </IconContext.Provider> : 
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <IoMdCheckmark />
                    </IconContext.Provider>}
                </div>

                <div className={`flex items-center col-span-9 ${taskComplete && "line-through"}`}><span className="ml-2">{task.name}</span></div>
                <div onClick={() => incrementPomodoroComplete(index)} className={`cursor-pointer col-span-1 flex items-center justify-center ${taskComplete && "line-through"}`}>
                    {task.pomodoros > 0 && `${task.pomodoros_complete}/${task.pomodoros}`}
                </div>
                <div onClick={() => toggleUpdatingTaskIndex(index)} className="col-span-1 flex items-center justify-end cursor-pointer">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <BsThreeDotsVertical />
                    </IconContext.Provider>
                </div>
        </div>
    );
}

export default TaskListItem