import Axios from 'axios'

const getToken = () => {
    return localStorage.getItem('token'); // Assuming token is stored in local storage
};

const baseURL = 'http://localhost:8000';
const axios = Axios.create({
    baseURL: baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})
// Add a request interceptor to include the token in the headers
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axios;
