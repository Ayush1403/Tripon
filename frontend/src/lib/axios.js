import axios from 'axios'

// Store token in memory (not localStorage)
let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
};

export const getAuthToken = () => authToken;

export const clearAuthToken = () => {
    authToken = null;
};

export const axiosAPI = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true, 
})

axiosAPI.interceptors.request.use(
    (config) => {
        // Add token to Authorization header if available
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);
