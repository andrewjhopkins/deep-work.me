import React, { useRef, useEffect, useState } from 'react'

const RainCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = "rgba(174, 194, 224, 0.5";
        context.lineWidth = 0.4;
        context.lineCap = "round";
        context.fillStyle = "#123455";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        rain();
    }, [])

    const initParticles = () => {
        const canvas = canvasRef.current;
        const particles = [];
        for(let i = 0; i < 100; i++) {
            particles.push({ 
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                l: Math.random() * 0.75,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10,
            });
        }

        return particles;
    }

    const rain = () => {
        setInterval(draw, 90);
    }

    const draw = () => {
        const canvas = canvasRef.current;
        if(canvas != null) {
            const context = canvas.getContext("2d");
            const particles = initParticles();
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                context.beginPath();
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particles[i].x + particles[i].l * particles[i].xs, particles[i].y + particles[i].l * particles[i].ys);
                context.stroke();
            }
        }
    }

    return (
        <canvas ref={canvasRef} className="border fixed top-0 h-full w-full" id="rain-canvas">
        </canvas>
    )
}

export default RainCanvas