import React, { useState, useEffect, useContext } from 'react'
import { PomodoroContext } from "../../context/PomodoroContext";

interface IToastProps {
    message: string,
    show: boolean,
}

function Toast(props) {

    const { state, dispatch } = useContext(PomodoroContext);
    const { message, show } = props;

    const css = `
    .hidden-fade-out {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 1s, opacity 1s linear;
      }
    `;

    useEffect(() => {
        if (show) {
            setTimeout(function () { 
                dispatch({...state, type: "hide_toast" });
            }, 1500);
        }
    });

    return (
        <div className={`${show ? "" : "hidden-fade-out"} fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg`}>
            <style>{css}</style>
            <h1>{message}</h1>
        </div>
    )
}

export default Toast