// frontend/js/main.js
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
                        <h1>Welcome to Mindfull - Your Path to Wellness</h1>
                        <p class="hero-subtitle">Connecting you with expert therapists for your mental health journey.</p>
                        <img src="../assets/images/landscape.png" alt="Peaceful Landscape" class="hero-image">
                        <div class="hero-buttons">
                            <a href="#therapists" class="btn btn-primary">Find a Therapist</a>
                            ${!user ? `
                                <a href="#register" class="btn btn-secondary">Book an Appointment</a>
                            ` : ''}
                        </div>
                    </div>

                    <div class="storytelling-section">
                        <h2>Our Approach to Mental Wellness</h2>
                        <div class="storytelling-images">
                            <img src="../assets/images/session-therapy.jpg" alt="Therapy Session" class="story-image">
                            <img src="../assets/images/personal-growth.jpg" alt="Personal Growth" class="story-image">
                            <img src="../assets/images/healing.jpg" alt="Healing" class="story-image">
                        </div>
                        <p>At Mindfull, we believe in the power of therapy to transform lives. Our expert therapists are here to guide you on your journey to mental wellness.</p>
                    </div>

                    <div class="before-after-section">
                        <h2>Before and After</h2>
                        <div class="before-after-images">
                            <img src="../assets/images/before-therapy.jpg" alt="Before Therapy" class="before-after-image">
                            <img src="../assets/images/after-therapy.jpg" alt="After Therapy" class="before-after-image">
                        </div>
                        <p>See how therapy can make a difference in your life. Our clients have experienced significant growth and healing through our services.</p>
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
                renderTherapistList();
                break;
            default:
                mainContent.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());