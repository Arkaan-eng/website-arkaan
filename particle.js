// Floating Dust Particles Background
class Particles {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
        this.initMouseTracking();
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 2 + 0.5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.1 + 0.05;
            const duration = Math.random() * 20 + 20;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: rgba(0, 255, 221, ${opacity});
                border-radius: 50%;
                left: ${x}vw;
                top: ${y}vh;
                pointer-events: none;
                z-index: -1;
                animation: float ${duration}s linear infinite;
                animation-delay: ${Math.random() * -duration}s;
            `;
            
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x, y,
                size,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                originalX: x,
                originalY: y
            });
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${Math.random() * 0.1 + 0.05};
                }
                25% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(180deg);
                    opacity: ${Math.random() * 0.2 + 0.1};
                }
                75% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: ${Math.random() * 0.1 + 0.05};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Slow drift with mouse influence
            particle.x += particle.speedX + this.mouse.x * 0.1;
            particle.y += particle.speedY + this.mouse.y * 0.1;
            
            // Wrap around edges
            if (particle.x > 100) particle.x = 0;
            if (particle.x < 0) particle.x = 100;
            if (particle.y > 100) particle.y = 0;
            if (particle.y < 0) particle.y = 100;
            
            // Update position
            particle.element.style.left = `${particle.x}vw`;
            particle.element.style.top = `${particle.y}vh`;
            
            // Subtle opacity pulse
            const time = Date.now() * 0.001;
            const opacity = 0.05 + Math.sin(time + particle.originalX) * 0.05;
            particle.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new Particles();
});