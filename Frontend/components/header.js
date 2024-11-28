// frontend/components/header.js
import { getCurrentUser, logout } from '../js/auth.js';

export function renderHeader() {
    const header = document.getElementById('header');
    const user = getCurrentUser();

    header.innerHTML = `
        <div class="container">
            <a href="#home" class="logo">Mindfull</a>
            <button class="hamburger" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav-menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    ${user ? `
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#appointments">Appointments</a></li>
                        <li><a href="#therapists">Therapists</a></li>
                        <li><a href="#" id="logout-btn">Logout (${user.firstName})</a></li>
                    ` : `
                        <li><a href="#therapists">Therapists</a></li>
                        <li><a href="#login">Login</a></li>
                    `}
                </ul>
            </nav>
        </div>
    `;

    // Add hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add these styles to make the header more responsive
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            header nav ul {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            header nav li {
                padding: 5px 10px;
            }
        }
    `;
    document.head.appendChild(style);

    // Add logout functionality if user is logged in
    if (user) {
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            renderHeader();
            window.location.hash = 'home';
        });
    }
}

// Add this to handle auth state changes
window.addEventListener('storage', (e) => {
    if (e.key === 'user') {
        renderHeader();
    }
});