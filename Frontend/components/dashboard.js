import { getCurrentUser } from '../js/auth.js';
import { getUpcomingAppointments } from '../js/appointments.js';

export async function renderDashboard() {
    const mainContent = document.getElementById('main-content');
    const user = getCurrentUser();

    if (!user) {
        window.location.hash = 'login';
        return;
    }

    try {
        mainContent.innerHTML = '<div class="spinner"></div>';

        let appointmentsHtml = '<p>No upcoming appointments.</p>';
        try {
            const appointments = await getUpcomingAppointments();
            if (appointments && appointments.length > 0) {
                appointmentsHtml = `
                    <ul class="appointment-list">
                        ${appointments.map(apt => {
                            // Format the date and time properly
                            const appointmentDate = new Date(apt.date).toLocaleDateString();
                            const appointmentTime = apt.time;
                            
                            return `
                                <li class="appointment-item">
                                    Dr. ${apt.therapist_name} - 
                                    ${appointmentDate} at ${appointmentTime}
                                </li>
                            `;
                        }).join('')}
                    </ul>
                `;
            }
        } catch (appointmentError) {
            console.error('Error fetching appointments:', appointmentError);
            appointmentsHtml = '<p>Unable to load appointments at this time.</p>';
        }

        mainContent.innerHTML = `
            <div class="dashboard-container">
                <div class="card welcome-card">
                    <h2>Welcome, ${user.firstName} ${user.lastName}!</h2>
                </div>
                
                <div class="card appointments-card">
                    <h3>Your Upcoming Appointments</h3>
                    ${appointmentsHtml}
                    <button class="btn" onclick="window.location.hash='appointments'">
                        Manage Appointments
                    </button>
                </div>
                
                <div class="card actions-card">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="btn primary-btn" onclick="window.location.hash='therapists'">
                            Book New Appointment
                        </button>
                        <button class="btn" onclick="window.location.hash='appointments'">
                            View All Appointments
                        </button>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Dashboard error:', error);
        mainContent.innerHTML = `
            <div class="card">
                <h2>Error loading dashboard content. Please try again later.</h2>
                <p>Error details: ${error.message}</p>
            </div>
        `;
    }
}