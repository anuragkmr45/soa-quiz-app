import Home from '../pages';

import Login from '../pages/auth/login';
import Register from '../pages/auth/signup';

import Dashboard from '../pages/dashboard';
import AddQuiz from '../pages/dashboard/quize/add-quiz';
import LiveQuiz from '../pages/dashboard/quize/live-quiz';
import MyQuizes from '../pages/dashboard/quize/my-quizes';
import QuestionBank from '../pages/dashboard/quize/question-bank';

export const routes = [
    {
        element: <Home />,
        path: '/',
    },
    {
        element: <Login />,
        path: '/teacher-login',
    },
    {
        element: <Register />,
        path: '/teacher-register',
    },

]

export const dashboardRoutes = [
    {
        element: <Dashboard />,
        path: '/dashboard',
    },
    {
        element: <AddQuiz />,
        path: '/dashboard/add-quiz',
    },
    {
        element: <LiveQuiz />,
        path: '/dashboard/status-check',
    },
    {
        element: <MyQuizes />,
        path: '/dashboard/previous-quizes',
    },
    {
        element: <QuestionBank />,
        path: '/dashboard/question-bank',
    },
]