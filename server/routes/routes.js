const express = require('express');

// middlewares
const authenticateTeacher = require('../middlewares/teacher/auth/authenticateTeacher');
const authenticateStudent = require('../middlewares/student/auth/authenticateStudent');

// teacher's side
const loginController = require("../controllers/teachers/auth/login");
const { logoutTeacherController } = require("../controllers/teachers/auth/logout");
const registerController = require("../controllers/teachers/auth/register");
const checkResultController = require("../controllers/teachers/quiz/checkResultController");
const myQuizesController = require("../controllers/teachers/quiz/myQuizesController");

// quiz
const createQuizController = require("../controllers/quizzes/createQuizController");
const createLiveQuizController = require("../controllers/teachers/quiz/makeQuizLive");
const joinLiveQuizController = require("../controllers/students/quiz/joinLiveQuiz");
const getQuizDetailsController = require("../controllers/teachers/quiz/getQuizDetails");

// student's side
const studentLoginController = require("../controllers/students/auth/login")
const studentRegController = require("../controllers/students/auth/register")
const studentProfile = require("../controllers/students/profile/studentProfile")
const checkStudentResultController = require("../controllers/students/profile/checkResultController")
const { logoutStudentController } = require('../controllers/students/auth/logout')

const router = express.Router();

// post 
router.post('/', authenticateTeacher, logoutTeacherController);
router.post('/teacher-login', loginController);
router.post('/teacher-register', registerController);
router.post('/teacher-logout', authenticateTeacher, logoutTeacherController);
router.post('/dashboard/add-quiz', authenticateTeacher, createQuizController);
router.post('/dashboard/make-quiz-live', authenticateTeacher, createLiveQuizController);
router.post('/student-login', studentLoginController);
router.post('/student-register', studentRegController);
router.post('/student-logout', authenticateStudent, logoutStudentController);



// get
router.get('/student-profile', authenticateStudent, studentProfile)
router.get('/dashboard/previous-quizes', authenticateTeacher, myQuizesController)
router.get('/dashboard/previous-quizes/:quizId/results', authenticateTeacher, checkResultController)
router.get('/my-results', authenticateStudent, checkStudentResultController);
router.get('/dashboard/quiz-preview', authenticateTeacher,getQuizDetailsController);

module.exports = router;