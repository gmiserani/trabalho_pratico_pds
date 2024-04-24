import api from './api';
import { AxiosError } from 'axios';

// The login, signup, and logout functions are asynchronous functions that make requests to the server.
export const login = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password }).catch(
        (error: AxiosError) => {
            if (error.response) {
                throw error.response.data;
            }
        });

    return response;
}

export const signup = async (name: string, username: string, email: string, password: string, course: string, semester: string) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('course', course);
    formData.append('semester', semester);
    formData.append('password', password);

    const response = await api.post('/users/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(
        (error: AxiosError) => {
            if (error.response) {
                throw error.response.data;
            }
        });

    return response;
}

export const logout = async () => {
    const response = await api.post('/users/logout').catch(
        (error: AxiosError) => {
            if (error.response) {
                throw error.response.data;
            }
        });

    return response;
}

export const getLoggedUser = async () => {
    try {
        const response = await api.get('/users/my-profile');
        return response;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};