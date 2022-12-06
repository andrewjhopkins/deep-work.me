import React, { useContext } from 'react'
import { IoMdSettings } from "react-icons/io";
import { IconContext } from "react-icons";
import { PomodoroContext } from "../../context/PomodoroContext";

const SettingsButton = () => {
    const { state, dispatch} = useContext(PomodoroContext);

    const toggleShowSettings = () => {
        dispatch({...state, type: "toggle_show_settings"});
    }

    return(
        <div className="fixed right-10 top-10 cursor-pointer">
            <IconContext.Provider value={{ color: 'white', size: '30px' }}>
                <IoMdSettings onClick={toggleShowSettings} />
            </IconContext.Provider>
        </div>
    );
}

export default SettingsButton;