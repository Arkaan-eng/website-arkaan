// Easter Egg: Long Press Avatar
class EasterEgg {
    constructor() {
        this.avatar = document.getElementById('profile-avatar');
        this.modal = document.getElementById('easter-egg');
        this.pressTimer = null;
        this.pressDuration = 3000; // 3 seconds
        this.init();
    }
    
    init() {
        this.avatar.addEventListener('mousedown', this.startPress.bind(this));
        this.avatar.addEventListener('touchstart', this.startPress.bind(this));
        
        this.avatar.addEventListener('mouseup', this.cancelPress.bind(this));
        this.avatar.addEventListener('mouseleave', this.cancelPress.bind(this));
        this.avatar.addEventListener('touchend', this.cancelPress.bind(this));
        this.avatar.addEventListener('touchcancel', this.cancelPress.bind(this));
        
        // Close modal on click
        this.modal.addEventListener('click', () => {
            this.hideEgg();
        });
    }
    
    startPress(e) {
        e.preventDefault();
        
        // Visual feedback
        this.avatar.style.transform = 'scale(0.95)';
        this.avatar.style.opacity = '0.7';
        
        // Start timer
        this.pressTimer = setTimeout(() => {
            this.triggerEgg();
        }, this.pressDuration);
        
        // Add progress indicator
        this.createProgressIndicator();
    }
    
    cancelPress() {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
        
        // Reset visual feedback
        this.avatar.style.transform = '';
        this.avatar.style.opacity = '';
        
        // Remove progress indicator
        this.removeProgressIndicator();
    }
    
    createProgressIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'press-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: conic-gradient(rgba(0, 255, 221, 0.3) 0%, transparent 0%);
            animation: fill ${this.pressDuration}ms linear forwards;
            pointer-events: none;
            z-index: 100;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fill {
                to { background: conic-gradient(rgba(0, 255, 221, 0.3) 100%, transparent 100%); }
            }
        `;
        document.head.appendChild(style);
        
        this.avatar.appendChild(indicator);
        this.progressIndicator = indicator;
    }
    
    removeProgressIndicator() {
        if (this.progressIndicator) {
            this.progressIndicator.remove();
            this.progressIndicator = null;
        }
    }
    
    triggerEgg() {
        // Screen flash effect
        this.flashScreen();
        
        // Show modal after flash
        setTimeout(() => {
            this.showEgg();
        }, 500);
        
        // Reset avatar
        this.avatar.style.transform = '';
        this.avatar.style.opacity = '';
        this.removeProgressIndicator();
    }
    
    flashScreen() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 221, 0.1);
            z-index: 99998;
            animation: flash 1s ease-out;
            pointer-events: none;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flash {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(flash);
        
        // Remove flash element after animation
        setTimeout(() => {
            flash.remove();
            style.remove();
        }, 1000);
    }
    
    showEgg() {
        this.modal.classList.add('show');
        
        // Add some fun effects
        document.body.style.overflow = 'hidden';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            if (this.modal.classList.contains('show')) {
                this.hideEgg();
            }
        }, 3000);
    }
    
    hideEgg() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset avatar completely
        setTimeout(() => {
            this.avatar.style.transform = '';
            this.avatar.style.opacity = '';
            this.removeProgressIndicator();
        }, 300);
    }
}

// Initialize easter egg
document.addEventListener('DOMContentLoaded', () => {
    new EasterEgg();
});