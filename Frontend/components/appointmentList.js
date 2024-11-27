import { getAllAppointments, cancelAppointment } from '../js/appointments.js';

export async function renderAppointmentList() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="spinner"></div>';

    try {
        const appointments = await getAllAppointments();
        console.log('Appointments:', appointments);

        if (!appointments || appointments.length === 0) {
            mainContent.innerHTML = `
                <div class="card">
                    <h2>Your Appointments</h2>
                    <p>No appointments found.</p>
                    <a href="#therapists" class="btn">Book New Appointment</a>
                </div>
            `;
            return;
        }

        mainContent.innerHTML = `
            <div class="card">
                <h2>Your Appointments</h2>
                <ul id="appointment-list">
                    ${appointments.map(apt => `
                        <li>
                            Dr. ${apt.therapist_name || 'Unknown'} - 
                            ${new Date(apt.date).toLocaleDateString()} 
                            at ${apt.time}
                            <button class="btn btn-cancel" data-id="${apt.id}">Cancel</button>
                        </li>`).join('')}
                </ul>
                <a href="#therapists" class="btn">Book New Appointment</a>
            </div>
        `;

        document.querySelectorAll('.btn-cancel').forEach(button => {
            button.addEventListener('click', async (e) => {
                if (confirm('Are you sure you want to cancel this appointment?')) {
                    try {
                        await cancelAppointment(e.target.dataset.id);
                        e.target.closest('li').remove();
                    } catch (error) {
                        alert('Failed to cancel appointment. Please try again.');
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
        mainContent.innerHTML = `
            <div class="card">
                <h2>Error</h2>
                <p>Error loading appointments. Please try again later.</p>
                <p>Details: ${error.message}</p>
            </div>
        `;
    }
}