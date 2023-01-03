import { Reorder } from "framer-motion";
import { memo, useContext, useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import { Context } from "../../context/Context";
import { ITaskItem } from "../../context/Context";
import { actionType } from "../../reducers/reducerActionTypes";
import TaskListItem from "./TaskListItem";
import { v4 as uuid } from "uuid";

const TaskListWidget = memo(() => {
    const { state, dispatch } = useContext(Context);
    const [creatingTask, setCreatingTask] = useState(false);
    const [updatingTask, setUpdatingTask] = useState(false);
    const [updateTaskIndex, setUpdateTaskIndex] = useState(-1);
    const [newTask, setNewTask] = useState<ITaskItem>({pomodoros: 1, pomodoros_complete: 0} as ITaskItem);
    const [taskItems, setTaskItems] = useState([]);
    let darkMode;

    useEffect(() => {
        darkMode = document.documentElement.classList.contains("dark") ? true : false;
        const taskItemsString = localStorage.getItem("deep-work:taskitems");
        if(taskItemsString) {
            let taskItems: ITaskItem[] = JSON.parse(taskItemsString);
            taskItems.forEach((item) => {
                if (!item.id) {
                    item.id = uuid();
                }
            })
            setTaskItems(taskItems);
        }
    }, [])

    useEffect(() => {
        dispatch({...state, taskItems: taskItems, type: actionType.update_task_list})
    }, [taskItems])

    const createNewTask = () => {
        if (!newTask.id) {
            newTask.id = uuid();
        }
        setTaskItems(taskItems.concat(newTask));
        setCreatingTask(false);
    }

    const updateTask = () => {
        if (updateTaskIndex > -1) {
            state.taskItems[updateTaskIndex] = newTask;
            setTaskItems([...state.taskItems]);
            setUpdatingTask(false);
        }
    }

    const toggleCreatingTask = () => {
        setCreatingTask(!creatingTask);
        setNewTask({pomodoros: 1, pomodoros_complete: 0} as ITaskItem);
    }

    const toggleUpdatingTaskIndex = (index: number) => {
        setUpdatingTask(!updatingTask);
        setUpdateTaskIndex(index);
        setNewTask(taskItems[index]);
    }

    const toggleUpdatingTask = () => {
        setUpdatingTask(!updatingTask);
    }

    const updateNewTaskName = (target: HTMLInputElement) => {
        setNewTask({...newTask, name: target.value});
    }

    const deleteTask = () => {
        state.taskItems.splice(updateTaskIndex, 1);
        setTaskItems([...state.taskItems]);
        setUpdateTaskIndex(-1);
        setUpdatingTask(false);
    }

    const incrementNewTaskPomodoros = () => {
        if (newTask.pomodoros < 10) {
            setNewTask({...newTask, pomodoros: newTask.pomodoros + 1})
        }
    }

    const decrementNewTaskPomodoros = () => {
        if (newTask.pomodoros > 1) {
            const pomodoros = newTask.pomodoros - 1;
            const pomodoros_complete = newTask.pomodoros_complete > pomodoros ? pomodoros : newTask.pomodoros_complete
            setNewTask({...newTask, pomodoros, pomodoros_complete})
        }
    }

    const removeAllTasks = () => {
        setTaskItems([]);
    }

    const incrementPomodoroComplete = (index: number) => {
        if (state.taskItems[index].pomodoros_complete < state.taskItems[index].pomodoros) {
            state.taskItems[index] = {...state.taskItems[index], pomodoros_complete: state.taskItems[index].pomodoros_complete + 1};
            setTaskItems([...state.taskItems]);
        }
    }

    const redoTask = (index: number) => {
        state.taskItems[index] = {...state.taskItems[index], pomodoros_complete: 0};
        setTaskItems([...state.taskItems]);
    }

    const tasks = taskItems.map((task, index) => {
        return(
            <Reorder.Item key={task.id} value={task}>
                <TaskListItem 
                    task={task} 
                    index={index} 
                    redoTask={redoTask} 
                    incrementPomodoroComplete={incrementPomodoroComplete} 
                    toggleUpdatingTaskIndex={toggleUpdatingTaskIndex}
                />
            </Reorder.Item>
        );
    })

    return (
        <div className="border-2 bg-opacity-90 rounded-lg bg-gray-400 dark:border-gray-900 dark:bg-gray-800">
            <div className="h-2 handle cursor-move"></div>
            <div className="h-96">
                <div style={{height: "15%"}} className="grid grid-cols-6">
                    <div className="flex justify-center items-center col-span-2 text-1xl text-center text-slate-800 dark:text-white"> 
                        Task List 
                    </div>
                    <div className="col-span-4 grid grid-cols-12 flex justify-center items-center">
                        {creatingTask || updatingTask ?
                        <div onClick={creatingTask ? toggleCreatingTask : toggleUpdatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 hover:bg-red-800 text-zinc-800 bg-red-600 dark:text-white dark:bg-red-900 font-bold rounded h-2/4`}>Exit</div> :
                        <div onClick={toggleCreatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 hover:bg-blue-800 font-bold rounded h-2/4 text-zinc-800 bg-blue-600 dark:text-white dark:bg-blue-900`}>Create</div>
                        }
                    </div>
                </div>

                {creatingTask || updatingTask ? 
                <div style={{height: "85%"}} className="grid grid-rows-6 p-2">

                    <div className="row-span-2 grid grid-rows-6">

                        <div className="row-span-2 text-white grid grid-cols-8">
                            <div className="col-span-2 flex items-center">
                                <label className="text-gray-400 ml-2">
                                    Task
                                </label>
                            </div>

                            {!creatingTask && 
                                <div onClick={deleteTask} className="cursor-pointer flex items-center justify-center col-start-8 col-span-1">
                                    <IconContext.Provider value={{ color: `${darkMode ? "white" : "rgb(39 39 42)"}`, size: '20px' }}>
                                        <AiFillDelete />
                                    </IconContext.Provider>
                                </div>
                            }
                        </div>

                        <div className="row-span-3">
                            <input onChange={(e) => updateNewTaskName(e.target as HTMLInputElement)} value={newTask.name} className="text-zinc-800 bg-gray-300 dark:text-white dark:bg-gray-700 appearance-none rounded w-full h-full py-2 px-4 leading-tight focus:outline-none" placeholder="Task to complete" />
                        </div>
                    </div>

                    <div className="row-span-1 grid grid-cols-12">
                        <div className="ml-3 flex items-center col-span-9 text-zinc-800 dark:text-white">
                            Pomodoros
                        </div>
                        <div className="col-span-3 grid grid-cols-3">
                            <div onClick={decrementNewTaskPomodoros} className="cursor-pointer col-span-1 flex justify-center items-center text-zinc-800 dark:text-white text-1xl">-</div>
                            <div className="col-span-1 flex justify-center items-center text-zinc-800 dark:text-white text-1xl">{newTask.pomodoros}</div>
                            <div onClick={incrementNewTaskPomodoros} className="cursor-pointer col-span-1 flex justify-center items-center text-zinc-800 dark:text-white text-1xl">+</div>
                        </div>
                    </div>

                    <div className="row-span-1 flex items-center justify-center">
                        <div onClick={creatingTask ? createNewTask : updateTask} className="cursor-pointer flex justify-center items-center col-start-8 col-span-4 hover:bg-blue-800 font-bold rounded h-3/4 w-1/3 text-zinc-800 bg-blue-600 dark:bg-blue-900 dark:text-white">
                            {creatingTask ? "Create" : "Update"}
                        </div>
                    </div>
                </div> 
                : 
                <div style={{height: "85%"}} className="grid grid-rows-6 p-2">
                    <div className="mt-2 row-span-5">
                        <Reorder.Group values={taskItems} onReorder={setTaskItems}>
                            {tasks}
                        </Reorder.Group>
                    </div>
                    <div className="grid grid-cols-12">
                        <div onClick={removeAllTasks} className="cursor-pointer flex justify-center items-center col-start-9 col-span-4 hover:bg-red-800 font-bold rounded h-3/4 text-zinc-800 bg-red-600 dark:text-white dark:bg-red-900">Remove All</div>
                    </div>
                </div>
                }
        
            </div>
            <div className="h-2 handle cursor-move"></div>
           </div>
    )
});

TaskListWidget.displayName = "TaskListWidget";
export default TaskListWidget;
