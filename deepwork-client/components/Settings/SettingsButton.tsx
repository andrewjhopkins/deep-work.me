import React, { useContext } from 'react'
import { IoMdSettings } from "react-icons/io";
import { IconContext } from "react-icons";
import { Context } from "../../context/Context";
import { action } from '../../reducers/reducerActions';

const SettingsButton = () => {
    const { state, dispatch} = useContext(Context);

    const toggleShowSettings = () => {
        dispatch({...state, type: action.toggle_show_settings});
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