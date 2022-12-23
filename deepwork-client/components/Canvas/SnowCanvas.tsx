import React, { useRef, useEffect } from 'react'

const particlesLength = 25;

const SnowCanvas = () => {
    const canvasRef = useRef(null);
    let angle = 0;

    useEffect(() => {
        snow();
    }, [])

    const initParticles = () => {
        const canvas = canvasRef.current;
        const particles = [];
        for(let i = 0; i < particlesLength; i++) {
            particles.push({ 
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 0.75 + 1,
                d: Math.random() + 0.75
            });
        }

        return particles;
    }

    const snow = () => {
        const particles = initParticles();
        setInterval(() => { draw(particles) }, 25);
    }

    const draw = (particles) => {
        const canvas = canvasRef.current;
        if(canvas != null) {
            const context = canvas.getContext("2d");
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

                f.y += Math.pow(f.d, 1.1);
                f.x += Math.sin(angle);

                if (f.y > canvas.height) {
                    particles[i] = {x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d}
                }
            }
        }
    }

    return (
        <canvas ref={canvasRef} className="fixed top-0 h-full w-full" id="snow-canvas">
        </canvas>
    )
}

export default SnowCanvas