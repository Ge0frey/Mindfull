import { initAuth, getCurrentUser } from "./auth";
import { initAuth, getCurrentUser } from './auth.js';
import { initAppointments } from './appointments.js';
import { initTherapists } from './therapist.js';
import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

const app = {
    init() {
        this.renderComponents();
        this.initModules();
        this.handleNavigation();
    },

    renderComponents() {
        renderHeader();
        renderFooter();
    },

    initModules() {
        initAuth();
        initAppointments();
        initTherapists();
    },

    handleNavigation() {
        window.addEventListener('hashchange', this.routeHandler.bind(this));
        this.routeHandler();
    },

    async routeHandler() {
        const hash = window.location.hash.slice(1) || 'home';
        const mainContent = document.getElementById('main-content');
        const user = getCurrentUser();
        mainContent.innerHTML = '<div class="spinner"></div>';

        switch (hash) {
            case 'home':
                mainContent.innerHTML = `
                    <div class="hero-section">
                        <div class="hero-content">
                            <h1>Welcome to Mindfull</h1>
                            <p class="hero-subtitle">Your Mental Health is Our Priority</p>
                            <div class="hero-buttons">
                                <a href="#therapists" class="btn btn-primary">Find a therapist</a>
                                ${!user ? `
                                    <a href="#register" class="btn btn-secondary">Join Now</a>
                                ` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="features-section">
                        <div class="container">
                            <h2>Why Choose Mindfull?</h2>
                            <div class="features-grid">
                                <div class="feature-card">
                                    <i class="fas fa-user-md"></i>
                                    <h3>Expert Therapist</h3>
                                    <p>Connect with qualified healthcare professionals</p>
                                </div>
                                <div class="feature-card">
                                    <i class="fas fa-clock"></i>
                                    <h3>24/7 Availability</h3>
                                    <p>Access healthcare services anytime, anywhere</p>
                                </div>
                                <div class="feature-card">
                                    <i class="fas fa-comments"></i>
                                    <h3>Easy Consultation</h3>
                                    <p>Simple and convenient online appointments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'login':
                const { renderLogin } = await import('../components/login.js');
                renderLogin();
                break;
            case 'register':
                const { renderRegister } = await import('../components/register.js');
                renderRegister();
                break;
            case 'dashboard':
                const { renderDashboard } = await import('../components/dashboard.js');
                renderDashboard();
                break;
            case 'appointments':
                const { renderAppointmentList } = await import('../components/appointmentList.js');
                renderAppointmentList();
                break;
            case 'therapists':
                const { renderTherapistList } = await import('../components/therapistList.js');
                renderTherapistList()
                break;
            default:
                mainContent.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());