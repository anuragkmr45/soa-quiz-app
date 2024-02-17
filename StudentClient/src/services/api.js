import axios from 'axios';

const baseURL = 'http://192.168.29.186:5000';

const api = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token, includeBearer = true) => {

    if (token) {
        if (includeBearer) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            api.defaults.headers.common['Authorization'] = token;
        }
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

const apiEndpoints = {
    login: ({ registrationNumber, password }) => api.post('/student-login', { registrationNumber, password }),
    logout: () => api.post('/student-logout').then(response => console.log(response)).catch(error => console.error(error)),
    register: ({ name, registrationNumber, email, password, batch, branch, section, course }) =>
        api.post('/student-register', { name, registrationNumber, email, password, batch, branch, section, course }),
    getProfile: (token) => {
        setAuthToken(token);
        return api.get('/student-profile');
    },
    joinQuiz: ({ quizId, password }) => {
        const token = localStorage.getItem('token');
        setAuthToken(token);
        return api.post('/join-live-quiz', { quizId, password });
    },
    getMyResults: (token) => {
        setAuthToken(token);
        return api.get('/my-results');
    },
};

export default apiEndpoints;