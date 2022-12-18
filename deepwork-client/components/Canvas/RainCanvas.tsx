import React, { useRef, useEffect, useState } from 'react'

const RainCanvas = () => {
    const canvasRef = useRef(null);

    const [innerWidth, setInnerWidth] = useState(0);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);

        context.fillStyle = "#123455";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, [])

    return (
        <canvas ref={canvasRef} className="border fixed top-0 h-full w-full" id="rain-canvas">
        </canvas>
    )
}

export default RainCanvas