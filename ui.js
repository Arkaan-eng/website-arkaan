// UI Controls and Interactions
class UI {
    constructor() {
        this.contextMenu = document.getElementById('context-menu');
        this.themeToggle = document.getElementById('theme-toggle');
        this.username = document.getElementById('username');
        this.init();
    }
    
    init() {
        this.initTheme();
        this.initContextMenu();
        this.initCopyFeature();
        this.initThemeButton();
    }
    
    initTheme() {
        // Check saved theme or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.documentElement.classList.replace('dark', 'light');
        }
    }
    
    initContextMenu() {
        // Custom right-click menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            this.contextMenu.style.left = `${e.pageX}px`;
            this.contextMenu.style.top = `${e.pageY}px`;
            this.contextMenu.classList.add('show');
            
            // Close menu when clicking elsewhere
            setTimeout(() => {
                document.addEventListener('click', this.closeContextMenu.bind(this));
            }, 10);
        });
        
        // Context menu actions
        this.contextMenu.addEventListener('click', (e) => {
            const action = e.target.closest('.menu-item')?.dataset.action;
            
            switch(action) {
                case 'copy':
                    this.copySelection();
                    break;
                case 'theme':
                    this.toggleTheme();
                    break;
                case 'refresh':
                    this.softRefresh();
                    break;
            }
            
            this.closeContextMenu();
        });
    }
    
    closeContextMenu() {
        this.contextMenu.classList.remove('show');
        document.removeEventListener('click', this.closeContextMenu);
    }
    
    copySelection() {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            navigator.clipboard.writeText(selectedText).then(() => {
                this.showNotification('Copied to clipboard');
            });
        }
    }
    
    initCopyFeature() {
        // Copy username on click
        this.username.addEventListener('click', () => {
            const textToCopy = this.username.getAttribute('data-copy-text') || 'arkaan';
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.showNotification('Username copied');
            });
        });
    }
    
    initThemeButton() {
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    toggleTheme() {
        const html = document.documentElement;
        
        if (html.classList.contains('dark')) {
            html.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        
        // Smooth transition
        html.style.transition = 'all 0.8s ease';
        setTimeout(() => {
            html.style.transition = '';
        }, 800);
    }
    
    softRefresh() {
        document.body.style.opacity = '0.5';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: rgba(26, 26, 36, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 255, 221, 0.3);
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: rgba(0, 255, 221, 0.8);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
}

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    new UI();
});