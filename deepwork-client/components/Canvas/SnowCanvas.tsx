import React, { useRef, useEffect } from 'react'

const particlesLength = 10;

const SnowCanvas = () => {
    const canvasRef = useRef(null);
    let angle = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        snow();
    }, [])

    const initParticles = () => {
        const canvas = canvasRef.current;
        const particles = [];
        for(let i = 0; i < particlesLength; i++) {
            particles.push({ 
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * (1 + 2),
                d: Math.random() + 1
            });
        }

        return particles;
    }

    const snow = () => {
        setInterval(draw, 100);
    }

    const draw = () => {
        const canvas = canvasRef.current;
        if(canvas != null) {
            const context = canvas.getContext("2d");
            const particles = initParticles();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle="white";
            context.beginPath();
            for (let i = 0; i < particlesLength; i++) {
                var f = particles[i];
                context.moveTo(f.x, f.y);
                context.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
            }
            context.fill();

            angle += 0.01;
            for (let i = 0; i < particlesLength; i++) {
                let f = particles[i];

                f.y += 0.00000001;
                f.x += Math.sin(angle) * 2;

                if (f.y > canvas.height) {
                    particles[i] = {x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d}
                }
            }
        }
    }

    return (
        <canvas ref={canvasRef} className="border fixed top-0 h-full w-full" id="snow-canvas">
        </canvas>
    )
}

export default SnowCanvas