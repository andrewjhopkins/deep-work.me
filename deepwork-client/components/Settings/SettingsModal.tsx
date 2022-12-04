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
            <div style={{ zIndex: 999}} className="fixed inset-0 mx-auto my-32 h-64 w-96 border-2 z-10 border-2 border-gray-900 bg-gray-800 rounded-lg">
            </div>
            <div onClick={toggleShowSettings} className="fixed inset-0 h-full w-full fixed z-50 bg-black opacity-60"></div>
          </>
        ) : null}
      </>
    );
  }

export default SettingsModal;