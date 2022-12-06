import React, { useContext } from 'react'
import { IoMdSettings } from "react-icons/io";
import { IconContext } from "react-icons";
import { PomodoroContext } from "../../context/PomodoroContext";

const SettingsButton = (props) => {
    const { state, dispatch} = useContext(PomodoroContext);
    const { isMobile } = props;

    const toggleShowSettings = () => {
        dispatch({...state, type: "toggle_show_settings"});
    }

    if (isMobile) {
        return (
            <div className="fixed left-10 bottom-10 cursor-pointer">
                <IconContext.Provider value={{ color: 'white', size: '30px' }}>
                    <IoMdSettings onClick={toggleShowSettings} />
                </IconContext.Provider>
            </div>
        );
    }
    else {
        return(
            <div className="fixed right-10 top-10 cursor-pointer">
                <IconContext.Provider value={{ color: 'white', size: '30px' }}>
                    <IoMdSettings onClick={toggleShowSettings} />
                </IconContext.Provider>
            </div>
        );
    }
}

export default SettingsButton;