import axios from 'axios';

// const baseURL = 'http://localhost:5000';
// const baseURL = 'http://192.168.166.83:5000';
// const baseURL = 'https://weary-bass-dirndl.cyclic.app/';
// const baseURL = 'https://sheepdog-large-personally.ngrok-free.app/'
// const baseURL = 'https://quizzynodecached.onrender.com/'
// const baseURL = 'https://weak-rose-bighorn-sheep-wear.cyclic.app/'
// let baseURL = 'https://a143-2405-201-a003-9050-5087-df23-ac58-d3fc.ngrok-free.app'
// const baseURL = 'https://b1ca-2405-201-a003-9050-d980-b330-5e4-1d01.ngrok-free.app/'
// const baseURL = 'https://stormy-slug-train.cyclic.app/';
const baseURL = 'https://panicky-fish-hose.cyclic.app/'

const api = axios.create({
    baseURL: baseURL,
    // timeout: 10000,
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
    teacher: {
        login: ({ email, password }) => api.post('/teacher-login', { email, password }),
        register: ({ name, email, password }) => api.post('/teacher-register', { name, email, password }),
        logout: () => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.post('/');
        },
        createQuiz: ({ Title, Description, DateCreated, SubjectID, TopicName, Questions }) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.post('/dashboard/add-quiz', { Title, Description, DateCreated, SubjectID, TopicName, Questions });
        },
        createLiveQuiz: ({ quizId }) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.post('/dashboard/make-quiz-live', { quizId });
        },
        getMyQuizzes: () => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.get('/dashboard/previous-quizes');
        },
        getQuiz: (quizId) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.get(`/teachers/dashboard/previous-quizes/${quizId}`);
        },
        getQuizDetails: (quizId) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, true);
            return api.get(`/dashboard/quiz-preview?quizId=${quizId}`);
        },
        getQuizResults: (token, quizId) => {
            setAuthToken(token);
            return api.get(`/dashboard/my-quizzes/${quizId}/results`);
        },
        endQuiz: (quizId) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, true)
            return api.get(`/dashboard/make-quiz-live/${quizId}/end-quiz`)
        }
    },
    student: {
        login: ({ regNo, password }) => api.post('/student-login', { regNo, password }),
        logout: () => api.post('/student-logout').then(response => console.log(response)).catch(error => console.error(error)),
        register: ({ name, regNo, branch, section, batch, password }) =>
            api.post('/student-register', { name, regNo, branch, section, batch, password }),
        getProfile: (token) => {
            setAuthToken(token);
            return api.get('/student-profile');
        },
        getMyResults: (token) => {
            setAuthToken(token);
            return api.get('/my-results');
        },
    },
};

export default apiEndpoints;