import {api} from './utils.js';
import { renderHeader } from '../components/header.js';

export async function login (email, password) {
    try {
        const response = await api.post('/auth/login', {
            email, password
        });
        const user = {
            id: response.user.id,
            firstName: response.user.first_name,
            lasttName: response.user.last_name,
            name: `${response.user.first_name} ${response.user.last_name}`,
            email: response.user.email
        };
        localStorage.setItem('user',JSON.stringify(user));
        renderHeader();
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Login failed');
    }
}

export async function register(firstName, lastName, email, phone, dateOfBirth, gender, password) {
    try {
        const response = await api.post('/auth/register', {
            firstName, 
            lastName, 
            email, 
            phone, 
            dateOfBirth, 
            gender, 
            password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message || 'Registration failed');
        } else if (error.request) {
          throw new Error('No response from server');
        } else {
          throw new Error('Error setting up request: ' + error.message);
        }
    }
}

export function logout() {
    localStorage.removeItem('used');
    renderHeader();
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function isLoggedIn() {
    return !!getCurrentUser();
}

export function initAuth() {
    // Any initialization logic for auth
}