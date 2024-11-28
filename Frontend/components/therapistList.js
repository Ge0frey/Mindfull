import { getAllTherapists } from '../js/therapist.js';
import { bookAppointment } from '../js/appointments.js';
import { getCurrentUser } from '../js/auth.js';

export async function renderTherapistList() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="spinner"></div>';

    try {
        const therapists = await getAllTherapists();
        const user = getCurrentUser();
        
        mainContent.innerHTML = `
            <div class="therapists-container">
                <div class="therapists-header">
                    <h2>Our Medical Experts</h2>
                    <p>Connect with our experienced healthcare professionals for quality medical care</p>
                </div>
                
                <div class="therapist-grid">
                    ${therapists.map(therapist => `
                        <div class="therapist-card">
                            <div class="therapist-image">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <h3>Dr. ${therapist.first_name} ${therapist.last_name}</h3>
                            <div class="specialization">${therapist.specialization}</div>
                            <div class="therapist-info">
                                <p>10+ years of experience</p>
                            </div>
                            <div class="therapist-stats">
                                <div class="stat-item">
                                    <div class="stat-value">500+</div>
                                    <div class="stat-label">Patients</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">4.9</div>
                                    <div class="stat-label">Rating</div>
                                </div>
                            </div>
                            ${user ? `
                                <button class="btn btn-primary btn-book" data-id="${therapist.id}" 
                                        data-name="Dr. ${therapist.first_name} ${therapist.last_name}"
                                        data-specialization="${therapist.specialization}">
                                    Book Appointment
                                </button>
                            ` : `
                                <a href="#login" class="btn btn-secondary">Login to Book</a>
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>

            ${user ? `
                <!-- Booking Modal -->
                <div id="bookingModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Book Appointment</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="bookingForm">
                                <div class="form-group">
                                    <label>therapist:</label>
                                    <p id="selectedTherapist" class="selected-therapist"></p>
                                </div>
                                <div class="form-group">
                                    <label for="appointmentDate">Date:</label>
                                    <input type="date" id="appointmentDate" required 
                                           min="${new Date().toISOString().split('T')[0]}">
                                </div>
                                <div class="form-group">
                                    <label for="appointmentTime">Time:</label>
                                    <select id="appointmentTime" required>
                                        <option value="">Select a time</option>
                                        ${generateTimeSlots()}
                                    </select>
                                </div>
                                <div class="modal-buttons">
                                    <button type="button" class="btn btn-secondary" id="cancelBooking">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Book Appointment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;

        // Only add event listeners if user is logged in
        if (user) {
            // Add event listeners for booking functionality
            const modal = document.getElementById('bookingModal');
            const bookButtons = document.querySelectorAll('.btn-book');
            const closeModal = document.querySelector('.close-modal');
            const cancelButton = document.getElementById('cancelBooking');
            const bookingForm = document.getElementById('bookingForm');

            bookButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const therapistId = button.dataset.id;
                    const therapistName = button.dataset.name;
                    const specialization = button.dataset.specialization;
                    
                    document.getElementById('selectedTherapist').innerHTML = `
                        <strong>${therapistName}</strong><br>
                        <span class="specialization">${specialization}</span>
                    `;
                    modal.setAttribute('data-therapist-id', therapistId);
                    modal.classList.add('show');
                });
            });

            const closeModalFunction = () => {
                modal.classList.remove('show');
                bookingForm.reset();
            };

            closeModal.addEventListener('click', closeModalFunction);
            cancelButton.addEventListener('click', closeModalFunction);

            bookingForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const therapistId = modal.getAttribute('data-therapist-id');
                const date = document.getElementById('appointmentDate').value;
                const time = document.getElementById('appointmentTime').value;

                try {
                    await bookAppointment(therapistId, date, time);
                    closeModalFunction();
                    alert('Appointment booked successfully!');
                    window.location.hash = 'appointments';
                } catch (error) {
                    alert('Failed to book appointment: ' + error.message);
                }
            });
        }

    } catch (error) {
        console.error('Error:', error);
        mainContent.innerHTML = `
            <div class="therapists-container">
                <div class="card">
                    <h2>Error</h2>
                    <p>Error loading therapists. Please try again later.</p>
                    <p>Details: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        const hourStr = hour.toString().padStart(2, '0');
        slots.push(`<option value="${hourStr}:00">${hourStr}:00</option>`);
        slots.push(`<option value="${hourStr}:30">${hourStr}:30</option>`);
    }
    return slots.join('');
}