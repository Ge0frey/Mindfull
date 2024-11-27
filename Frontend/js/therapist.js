import { api } from './utils.js';

export function initTherapists() {
    // Any initialization logic for therapists
}

export async function getAllTherapists() {
    try {
        const response = await api.get('/therapists');
        return response;
    } catch (error) {
        console.error('Error fetching therapists:', error);
        throw new Error(error.message || 'Failed to fetch therapists');
    }
}

export async function getTherapistsById(id) {
    try {
        const response = await api.get(`/therapists/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch therapist');
    }
}