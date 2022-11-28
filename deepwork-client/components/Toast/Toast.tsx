import React, { useEffect, useContext } from 'react'
import { PomodoroContext } from "../../context/PomodoroContext";

function Toast() {

    const { state, dispatch } = useContext(PomodoroContext);
    const { toastMessage, toastShow, toastColor } = state;

    const display = {
        "blue": "border-blue-500",
        "yellow": "border-yellow-500",
        "green": "border-green-500",
        "red": "border-red-500"
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
                dispatch({...state, type: "hide_toast" });
            }, 1500);
        }
    });

    return (
        <div className={`${toastShow ? "" : "hidden-fade-out"} fixed right-10 bottom-10 px-5 py-4 border-r-8 ${ display[toastColor] } bg-white drop-shadow-lg`}>
            <style>{css}</style>
            <h1>{toastMessage}</h1>
        </div>
    )
}

export default Toast