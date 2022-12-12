import { memo, useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PomodoroContext } from "../../context/PomodoroContext";
import { ITaskItem } from "../../context/PomodoroContext";

const TaskListWidget = memo(() => {
    const { state, dispatch } = useContext(PomodoroContext);
    const [creatingTask, setCreatingTask] = useState(false);
    const [updatingTask, setUpdatingTask] = useState(false);
    const [updateTaskIndex, setUpdateTaskIndex] = useState(null);
    const [newTask, setNewTask] = useState<ITaskItem>({pomodoros: 0, pomodoros_complete: 0} as ITaskItem);

    const { taskItems } = state

    const createNewTask = () => {
        dispatch({...state, taskItems: state.taskItems.concat(newTask), type: "update_task_list"});
        setCreatingTask(false);
    }

    const updateTask = () => {
        state.taskItems[updateTaskIndex] = newTask;
        dispatch({...state, taskItems: state.taskItems, type: "update_task_list"});
        setUpdatingTask(false);
    }

    const toggleCreatingTask = () => {
        setCreatingTask(!creatingTask);
        setNewTask({pomodoros: 0, pomodoros_complete: 0} as ITaskItem);
    }

    const toggleUpdatingTask = (index) => {
        setUpdatingTask(!updatingTask);
        setUpdateTaskIndex(index);
        setNewTask(taskItems[index]);
    }

    const updateNewTaskName = (target: HTMLInputElement) => {
        setNewTask({...newTask, name: target.value});
    }

    const incrementNewTaskPomodoros = () => {
        if (newTask.pomodoros < 10) {
            setNewTask({...newTask, pomodoros: newTask.pomodoros + 1})
        }
    }

    const decrementNewTaskPomodoros = () => {
        if (newTask.pomodoros > 0) {
            setNewTask({...newTask, pomodoros: newTask.pomodoros - 1})
        }
    }

    const removeAllTasks = () => {
        dispatch({...state, taskItems: [], type: "update_task_list"});
    }

    const tasks = taskItems.map((task, index) => {
        return(
            <div className="border border-gray-800 h-10 grid grid-cols-12 bg-gray-700 text-white">
                <div className="ml-2 flex items-center justify-center col-span-1">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <IoMdCheckmark />
                    </IconContext.Provider>
                </div>

                <div className="flex items-center col-span-9"><span className="ml-2">{task.name}</span></div>
                <div className="col-span-1 flex items-center justify-center">
                    {task.pomodoros > 0 && `${task.pomodoros_complete}/${task.pomodoros}`}

                </div>
                <div onClick={() => toggleUpdatingTask(index)} className="col-span-1 flex items-center justify-end cursor-pointer">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <BsThreeDotsVertical />
                    </IconContext.Provider>
                </div>
            </div>
        );
    })

    return (
        <div className="handle cursor-move h-96 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">

            <div style={{height: "15%"}} className="grid grid-cols-6">
                <div className="flex justify-center items-center col-span-2 text-white text-1xl text-center"> 
                    Task List 
                </div>
                <div className="col-span-4 grid grid-cols-12 flex justify-center items-center">
                    {creatingTask || updatingTask ?
                    <div onClick={creatingTask ? toggleCreatingTask : toggleUpdatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded h-2/4`}>Exit</div> :
                    <div onClick={toggleCreatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded h-2/4`}>Create</div>
                    }
                </div>
            </div>

            {creatingTask || updatingTask ? 
            <div style={{height: "85%"}} className="grid grid-rows-6 p-2">

                <div className="row-span-2 grid grid-rows-6">

                    <div className="row-span-2 text-white">
                        <label className="text-gray-400 ml-2">
                            Task
                        </label>
                    </div>
                    <div className="row-span-3">
                        <input onChange={(e) => updateNewTaskName(e.target as HTMLInputElement)} value={newTask.name} className="text-white bg-gray-700 appearance-none rounded w-full h-full py-2 px-4 leading-tight focus:outline-none" placeholder="Do Work" />
                    </div>
                </div>

                <div className="row-span-1 grid grid-cols-12">
                    <div className="ml-3 flex items-center col-span-9 text-white">
                        Pomodoros
                    </div>
                    <div className="col-span-3 grid grid-cols-3">
                        <div onClick={decrementNewTaskPomodoros} className="cursor-pointer col-span-1 flex justify-center items-center text-white text-1xl">-</div>
                        <div className="col-span-1 flex justify-center items-center text-white text-1xl">{newTask.pomodoros}</div>
                        <div onClick={incrementNewTaskPomodoros} className="cursor-pointer col-span-1 flex justify-center items-center text-white text-1xl">+</div>
                    </div>
                </div>

                <div className="row-span-1 flex items-center justify-center">
                    <div onClick={creatingTask ? createNewTask : updateTask} className="cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded h-3/4 w-1/3">
                        {creatingTask ? "Create" : "Update"}
                    </div>
                </div>
            </div> 
            : 
            <div style={{height: "85%"}} className="grid grid-rows-6 p-2">
                <div className="mt-2 row-span-5">
                    {tasks}
                </div>
                <div className="grid grid-cols-12">
                    <div onClick={removeAllTasks} className="cursor-pointer flex justify-center items-center col-start-9 col-span-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded h-3/4">Remove All</div>
                </div>
            </div>
            }
       
           </div>
    )
});

TaskListWidget.displayName = "TaskListWidget";
export default TaskListWidget;
