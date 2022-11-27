import React from 'react'

interface IToastProps {
    message: string
}

function Toast(props) {
    const { message } = props;
    return (
        <div className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg">
            <h1>{message}</h1>
        </div>
    )
}

export default Toast