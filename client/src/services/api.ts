import axios from 'axios';

// Create an axios instance
// Axios is a simple promise based HTTP client for the browser and node.js
const api = axios.create({
    // Set the base URL of the API
    baseURL: import.meta.env.VITE_API_URL,
    // Allow cookies to be sent with the request
    withCredentials: true,
});

export default api;