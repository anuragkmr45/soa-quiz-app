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
    login: async ({ registrationNumber, password }) => {
        try {
            const response = await api.post('/student-login', { registrationNumber, password });
            return response;
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            const response = await api.post('/student-logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    register: async ({ name, registrationNumber, email, password, batch, branch, section, course }) => {
        try {
            const response = await api.post('/student-register', { name, registrationNumber, email, password, batch, branch, section, course });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getProfile: async (token) => {
        setAuthToken(token);
        try {
            const response = await api.get('/student-profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    joinQuiz: async ({ quizId, password, token }) => {
        setAuthToken(token);
        console.log('quiz called ')
        try {
            const response = await api.post('/join-quiz', { quizId, password, token });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getMyResults: async (token) => {
        setAuthToken(token);
        try {
            const response = await api.get('/my-results');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiEndpoints;
