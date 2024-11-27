import { api } from './utils.js';

export function initAppointments() {
    // Any initialization logic for appointments
}

export async function getAllAppointments() {
    try {
        const response = await api.get('/appointments');
        return response;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error(error.message || 'Failed to fetch appointments');
    }
}

export async function getUpcomingAppointments() {
    try {
        const response = await api.get('/appointments?upcoming=true');
        return response;
    } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
        throw new Error(error.message || 'Failed to fetch upcoming appointments');
    }
}

export async function bookAppointment(therapistId, date, time) {
    try {
        const response = await api.post('/appointments', {
            therapist_id: therapistId,
            appointment_date: date,
            appointment_time: time
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            // Redirect to login if not authenticated
            window.location.hash = 'login';
            throw new Error('Please log in to book appointments');
        }
        throw new Error(error.response?.data?.message || 'Failed to book appointment');
    }
}

export async function cancelAppointment(appointmentId) {
    try {
        const response = await api.delete(`/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to cancel appointment');
    }
}