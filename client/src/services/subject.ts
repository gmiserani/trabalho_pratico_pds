import api from './api';
import { AxiosError } from 'axios';

export const getAllSubjects = async (order: string) => {
    try {
        if (order === '') {
            const response = await api.get('/subject/');
            return response;
        }
        const response = await api.get(`/subject/?order=${order}`);
        return response;

    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
}

export const getSubjectById = async (id: string) => {
    try {
        const response = await api.get(`/subject/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching subject:', error);
        throw error;
    }
}

export const getMostCommonAnswers = async (id: string) => {
    try {
        const response = await api.get(`/subject/${id}/most-common-answers`);
        return response;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
}

export const getReviews = async (id: string) => {
    try {
        const response = await api.get(`/subject/${id}/reviews`);
        return response;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}

export const checkUserCanAddReview = async (id: string) => {
    try {
        const response = await api.get(`/subject/${id}/check-review`);
        return response;
    } catch (error) {
        console.error('Error checking review:', error);
        throw error;
    }
}

export const addReview = async (id: string, presence_rating: string,
    teacher_rating: string,
    project_rating: string,
    test_rating: string,
    effort_rating: string,
    overall_rating: string,
    comment: string) => {
    const formData = new FormData();
    formData.append('presence_rating', presence_rating);
    formData.append('teacher_rating', teacher_rating);
    formData.append('project_rating', project_rating);
    formData.append('test_rating', test_rating);
    formData.append('effort_rating', effort_rating);
    formData.append('overall_rating', overall_rating);
    formData.append('comment', comment);

    const response = await api.post(`/subject/${id}/add-review`, formData, {
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