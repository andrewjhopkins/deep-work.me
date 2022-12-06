import { memo, useState } from "react";

const TaskListWidget = memo(() => {

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

    const tasks = sampleTasks.map((task) => {
        return(
            <div className="border border-gray-800 h-10 grid grid-cols-12 bg-gray-700 text-white">
                <div className="border col-span-1"></div>
                <div className="flex items-center col-span-9"><span className="ml-2">{task.name}</span></div>
                <div className="border col-span-1"></div>
                <div className="border col-span-1"></div>
            </div>
        );
    })

    return (
        <div className="handle cursor-move h-52 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
            <div className="grid grid-rows-6 h-full p-2">

                <div className="row-span-1 grid grid-cols-6">
                    <div className="flex justify-center items-center col-span-2 text-white text-1xl text-center"> 
                        Task Tracker
                    </div>
                    <div className="col-span-4 grid grid-cols-12 flex justify-center items-center">
                        <div className="cursor-pointer flex justify-center items-center col-start-8 col-span-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded h-3/4">Create</div>
                    </div>
                </div>

                <div className="mt-2 row-span-3">
                    {tasks}
                </div>
                <div className="border row-span-2"></div>
            </div>
        </div>
    )
});

TaskListWidget.displayName = "TaskListWidget";

export default TaskListWidget;