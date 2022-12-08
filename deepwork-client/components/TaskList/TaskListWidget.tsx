import { memo, useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PomodoroContext } from "../../context/PomodoroContext";

const TaskListWidget = memo(() => {
    const { state, dispatch } = useContext(PomodoroContext);

    const [creatingTask, setCreatingTask] = useState(false);

    const { taskItems } = state



    const sampleTasks = [
        {
            "name": "task to do 1",
            "pomodoros": 2,
            "pomodoros_complete": 0,
            "finished": false
        },
        {
            "name": "task to do 2",
            "pomodoros": 3,
            "pomodoros_complete": 1,
            "finished": false
        }
    ]

    const toggleCreatingTask = () => {
        setCreatingTask(!creatingTask);
    }

    const tasks = sampleTasks.map((task) => {
        return(
            <div className="border border-gray-800 h-10 grid grid-cols-12 bg-gray-700 text-white">
                <div className="ml-2 flex items-center justify-center col-span-1">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <IoMdCheckmark />
                    </IconContext.Provider>
                </div>

                <div className="flex items-center col-span-9"><span className="ml-2">{task.name}</span></div>
                <div className="col-span-1 flex items-center justify-center">
                    {task.pomodoros_complete}/{task.pomodoros}
                </div>
                <div className="col-span-1 flex items-center justify-end">
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
                    Task Tracker
                </div>
                <div className="col-span-4 grid grid-cols-12 flex justify-center items-center">
                    {creatingTask ?
                    <div onClick={toggleCreatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded h-2/4`}>Exit</div> :
                    <div onClick={toggleCreatingTask} className={`cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded h-2/4`}>Create</div>
                    }
                </div>
            </div>

            {creatingTask ? 
            <div style={{height: "85%"}} className="grid grid-rows-6 p-2">

                <div className="row-span-2 grid grid-rows-6">

                    <div className="row-span-2 text-white">
                        <label className="text-gray-400 ml-2">
                            Task
                        </label>
                    </div>
                    <div className="row-span-2">
                        <input className="text-white bg-gray-700 appearance-none rounded w-full h-full py-2 px-4 leading-tight focus:outline-none" placeholder="Do Work" />
                    </div>
                </div>

                <div className="border row-span-1"></div>
                <div className="border row-span-1"></div>
            </div> 
            : 
            <div style={{height: "85%"}} className="grid grid-rows-6 p-2">

                <div className="mt-2 row-span-5">
                    {tasks}
                </div>

                <div className="grid grid-cols-12">
                    <div onClick={() => console.log("hello")} className="cursor-pointer flex justify-center items-center col-start-9 col-span-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded h-3/4">Remove All</div>
                </div>
            </div>
            }
       
    
           </div>
    )
});

TaskListWidget.displayName = "TaskListWidget";

export default TaskListWidget;