import React, { useRef, useEffect, useState } from 'react'

const RainCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "#123455";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, [])

    

    return (
        <canvas ref={canvasRef} className="border fixed top-0" id="rain-canvas" width={window.innerWidth} height={window.innerHeight}>
        </canvas>
    )
}

export default RainCanvas