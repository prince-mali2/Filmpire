import axios from "axios";

// Set up the axios instance to use the proxy server
export const moviesApi = axios.create({
    baseURL: 'http://localhost:3001/api', // Updated base URL
});

// Fetch a new token using the proxy server
export const fetchToken = async () => {
    try {
        const { data } = await moviesApi.get('/authentication/token/new'); // Proxy handles the TMDB API call
        const token = data.request_token;

        if (data.success) {
            localStorage.setItem('request_token', token);
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Error in fetchToken:', error.message);
    }
};

// Create a session ID using the proxy server
export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if (token) {
        try {
            const { data } = await moviesApi.post('/authentication/session/new', {
                request_token: token,
            });

            console.log('Session ID Response:', data);

            if (data.session_id) {
                localStorage.setItem('session_id', data.session_id);
                return data.session_id;
            } else {
                console.error('Session ID creation failed. Response:', data);
            }
        } catch (error) {
            console.log('Error in createSessionId:', error.response?.data || error.message);
        }
    } else {
        console.error('No request token found in localStorage.');
    }
};
