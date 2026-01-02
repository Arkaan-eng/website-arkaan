// System Monitoring Functions
class SystemMonitor {
    constructor() {
        this.startTime = Date.now();
        this.init();
    }
    
    init() {
        this.updateTime();
        this.updatePing();
        this.detectBrowser();
        this.updateUptime();
        
        setInterval(() => this.updateTime(), 1000);
        setInterval(() => this.updatePing(), 3000);
        setInterval(() => this.updateUptime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        document.getElementById('live-time').textContent = timeString;
    }
    
    updatePing() {
        const basePing = 20;
        const randomVariation = Math.floor(Math.random() * 40);
        const newPing = basePing + randomVariation;
        
        const pingElement = document.getElementById('ping-value');
        pingElement.style.opacity = '0.5';
        
        setTimeout(() => {
            pingElement.textContent = `${newPing}ms`;
            pingElement.style.opacity = '1';
            
            // Update ping dot color based on ping
            const pingDot = document.querySelector('.ping-dot');
            if (newPing > 50) {
                pingDot.style.backgroundColor = 'rgba(255, 100, 100, 0.6)';
            } else if (newPing > 30) {
                pingDot.style.backgroundColor = 'rgba(255, 200, 100, 0.6)';
            } else {
                pingDot.style.backgroundColor = 'rgba(0, 255, 221, 0.6)';
            }
        }, 200);
    }
    
    detectBrowser() {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";
        
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
            browser = "Chrome";
        } else if (userAgent.includes("Firefox")) {
            browser = "Firefox";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browser = "Safari";
        } else if (userAgent.includes("Edg")) {
            browser = "Edge";
        }
        
        document.getElementById('browser-info').textContent = browser;
    }
    
    updateUptime() {
        const now = Date.now();
        const diff = now - this.startTime;
        const seconds = Math.floor(diff / 1000);
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        document.getElementById('uptime').textContent = timeString;
    }
}

// Initialize system monitor
document.addEventListener('DOMContentLoaded', () => {
    new SystemMonitor();
});