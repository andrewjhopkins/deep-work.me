import React, { useContext } from 'react'
import { PomodoroContext } from "../../context/PomodoroContext";

const SettingsModal = () =>  {

    const { state, dispatch } = useContext(PomodoroContext);
    const { showSettings } = state;

    const toggleShowSettings = () => {
        dispatch({...state, type: "toggle_show_settings"});
    }

    return (
      <>
        {showSettings ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="w-2/3 h-72 shadow-lg flex flex-col w-full outline-none focus:outline-none bg-gray-800 rounded-lg grid grid-rows-4">
                  <div className="p-6 flex-auto row-span-3 border-2"></div>
                  <div className="row-span-1 border-2"></div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;