import React, { useRef, useEffect } from 'react'

const SnowCanvas = () => {
    const canvasRef = useRef(null);

    const particleAmount = 100;
    const particleSize = [0.5, 1.5];
    const particleSwing = [0.1, 1];
    const particleSpeed = [40, 100];
    const particleAmplitude = [25, 50];

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "rgb(255, 255, 255)";
        snow();
    }, [])

    const initParticles = () => {
        const canvas = canvasRef.current;
        const particles = [];
        for(let i = 0; i < particleAmount; i++) {
            particles.push({ 
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,


                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10,
            });
        }

        return particles;
    }

    const snow = () => {
        setInterval(draw, 90);
    }

    const draw = () => {
        const canvas = canvasRef.current;
        if(canvas != null) {
            const context = canvas.getContext("2d");
            const particles = initParticles();
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
            }
        }
    }

    return (
        <canvas ref={canvasRef} className="border fixed top-0 h-full w-full" id="snow-canvas">
        </canvas>
    )
}

export default SnowCanvas