import axios from 'axios';
import useAuthToken from '../hooks/token-manager/useAuthToken';

const baseURL = 'http://192.168.29.186:5000';
// const baseURL = 'http://192.168.166.83:5000';
// const baseURL = 'https://weary-bass-dirndl.cyclic.app/';

const api = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiEndpoints = {
    login: async ({ registrationNumber, password, androidId }) => {
        try {
            // const androidId = useGetAndroidID();
            const response = await api.post('/student-login', { registrationNumber, password, androidId });
            return response;
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            const authToken = await useAuthToken().getToken();

            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            const response = await api.post('/student-logout');
            return response;
        } catch (error) {
            throw error;
        }
    },
    register: async ({ name, registrationNumber, email, password, batch, branch, section, course, androidId }) => {
        try {
            // const androidId = useGetAndroidID();
            const response = await api.post('/student-register', {
                name, registrationNumber, email, password, batch, branch, section, course, androidId
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getProfile: async () => {
        try {
            const authToken = await useAuthToken().getToken();

            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            const response = await api.get('/student-profile');
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            delete api.defaults.headers.common['Authorization'];
        }
    },

    joinQuiz: async ({ quizId, password }) => {
        try {
            const authToken = await useAuthToken().getToken();

            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            const response = await api.post('/join-quiz', { quizId, password });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getMyResults: async () => {
        try {
            const authToken = await useAuthToken().getToken();

            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            const response = await api.get('/my-results');
            return response;
        } catch (error) {
            throw error;
        }
    },

    scoreCounter: async ({ registrationNumber, quizId, responses }) => {
        try {
            // console.log('registrationNumber: ', registrationNumber)
            // console.log('quizId: ', quizId)
            // console.log('responses api side : ', responses)
            const authToken = await useAuthToken().getToken();
            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            const response = await api.post('/score-counter', { registrationNumber, quizId, responses });
            return response;
        } catch (error) {
            throw error;
        }
    }

};

export default apiEndpoints;
