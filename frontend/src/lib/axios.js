import axios from 'axios'

export const axiosAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
})


axiosAPI.interceptors.request.use(
    (config) => {
        console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

axiosAPI.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.status} Response:`, response.data);
        return response;
    },
    (error) => {
        console.error(`❌ ${error.response?.status} Error:`, error.response?.data);
        return Promise.reject(error);
    }
);
