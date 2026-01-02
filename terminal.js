// Terminal Typewriter Effect
class Terminal {
    constructor() {
        this.textElement = document.getElementById('terminal-text');
        this.cursorElement = document.querySelector('.cursor');
        this.messages = [
            "welcome back.",
            "system nominal.",
            "archive loaded.",
            "just vibing.",
            "status: gabut.",
            "thinking...",
            "idle mode.",
            "coffee time?",
            "staring at void."
        ];
        this.messageIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        this.speed = 60;
        this.waitTime = 2000;
        
        this.init();
    }
    
    init() {
        this.type();
        
        // Add blinking cursor
        setInterval(() => {
            this.cursorElement.style.opacity = 
                this.cursorElement.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    type() {
        const currentMessage = this.messages[this.messageIndex];
        
        if (this.isWaiting) {
            setTimeout(() => {
                this.isWaiting = false;
                if (this.isDeleting) {
                    this.type();
                } else {
                    this.isDeleting = true;
                    this.type();
                }
            }, this.waitTime);
            return;
        }
        
        if (!this.isDeleting && this.charIndex < currentMessage.length) {
            this.textElement.textContent += currentMessage.charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.type(), this.speed);
        } else if (this.isDeleting && this.charIndex > 0) {
            this.textElement.textContent = currentMessage.substring(0, this.charIndex - 1);
            this.charIndex--;
            setTimeout(() => this.type(), this.speed / 2);
        } else {
            this.isDeleting = !this.isDeleting;
            this.isWaiting = true;
            if (!this.isDeleting) {
                this.messageIndex = (this.messageIndex + 1) % this.messages.length;
            }
            this.type();
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});