import React, { useEffect, useContext } from 'react'
import { Context } from "../../context/Context";
import { actionType } from '../../reducers/reducerActionTypes';

const Toast = () => {

    const { state, dispatch } = useContext(Context);
    const { toastMessage, toastShow, toastColor } = state;

    const display = {
        "blue": "border-blue-900",
        "indigo": "border-indigo-900",
        "red": "border-red-900"
    };

    const css = `
    .hidden-fade-out {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 1s, opacity 1s linear;
      }
    `;

    useEffect(() => {
        if (toastShow) {
            setTimeout(function () { 
                dispatch({...state, type: actionType.hide_toast });
            }, 1500);
        }
    });

    return (
        <div className={`${toastShow ? "" : "hidden-fade-out"} fixed right-10 bottom-10 px-5 py-4 border-r-8 ${ display[toastColor] } text-zinc-800 bg-gray-400 drop-shadow-lg dark:text-white dark:bg-gray-800 opacity-90`}>
            <style>{css}</style>
            <h1>{toastMessage}</h1>
        </div>
    )
}

export default Toast