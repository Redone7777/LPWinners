/**
 * LPWinners - Authentication System
 * Handles login/logout and session management
 */

class AuthManager {
    constructor() {
        this.storageKey = 'lpwinners_user';
        this.init();
    }

    init() {
        this.updateUI();
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return localStorage.getItem(this.storageKey) !== null;
    }

    /**
     * Get current user data
     */
    getCurrentUser() {
        const userData = localStorage.getItem(this.storageKey);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Login user
     */
    login(username, email, password) {
        // Simulate login - in real app this would call an API
        const user = {
            id: Date.now(),
            username: username,
            email: email,
            avatar: `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${Math.floor(Math.random() * 28) + 1}.png`,
            rank: 'Gold II',
            lp: 45,
            level: Math.floor(Math.random() * 300) + 50,
            joinDate: new Date().toISOString(),
            stats: {
                gamesPlayed: Math.floor(Math.random() * 500) + 100,
                winRate: Math.floor(Math.random() * 30) + 45,
                favoriteChampion: 'Jinx',
                postsCreated: Math.floor(Math.random() * 20),
                guidesCreated: Math.floor(Math.random() * 5)
            }
        };

        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.updateUI();
        return user;
    }

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem(this.storageKey);
        this.updateUI();
        // Redirect to home
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    /**
     * Update UI based on auth state
     */
    updateUI() {
        const isLoggedIn = this.isLoggedIn();
        const user = this.getCurrentUser();

        // Update sidebar auth icon
        const authNavItem = document.querySelector('.sidebar-auth-item');
        if (authNavItem) {
            if (isLoggedIn) {
                authNavItem.href = window.location.pathname.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
                authNavItem.innerHTML = `
                    <span class="sidebar-nav-icon">
                        <img src="${user.avatar}" alt="Profile" class="sidebar-avatar">
                    </span>
                    <span class="sidebar-nav-text">Profil</span>
                `;
                authNavItem.classList.add('logged-in');
            } else {
                authNavItem.href = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
                authNavItem.innerHTML = `
                    <span class="sidebar-nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" x2="3" y1="12" y2="12" />
                        </svg>
                    </span>
                    <span class="sidebar-nav-text">Login</span>
                `;
                authNavItem.classList.remove('logged-in');
            }
        }
    }

    /**
     * Protect page - redirect to login if not logged in
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            const loginUrl = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
            window.location.href = loginUrl;
            return false;
        }
        return true;
    }
}

// Initialize auth manager
const auth = new AuthManager();

// Export for use in other modules
export { AuthManager, auth };
