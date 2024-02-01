const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const pool = require('../../../config/db');

// Function to get Quiz details from the database
async function getQuizDetailsFromDatabase(quizId, teacherId, pool) {
    try {
        const quizQuery = `
            SELECT 
                quizzes.quizid,
                quizzes.title AS quiz_title, 
                questions.question AS question_text, 
                questions.option1, 
                questions.option2, 
                questions.option3, 
                questions.option4, 
                questions.answer
            FROM 
                quizzes 
            INNER JOIN 
                quizquestions ON quizzes.quizid = quizquestions.quizid
            INNER JOIN 
                questions ON quizquestions.questionid = questions.questionid
            WHERE 
                quizzes.quizid = $1 AND quizzes.teacherId = $2
        `;

        const quizResult = await pool.query(quizQuery, [quizId, teacherId]);

        if (quizResult.rows.length === 0) {
            return null; // Quiz not found or unauthorized access
        }

        const quizData = quizResult.rows.map(row => ({
            question_text: row.question_text,
            options: [row.option1, row.option2, row.option3, row.option4],
            answer: row.answer, // To be removed from joinLiveQuiz controller
        }));

        const quizTitle = quizResult.rows[0].quiz_title;

        return { quizTitle, quizData };
    } catch (error) {
        console.error(error);
        return null; // Error fetching quiz details
    }
}

// Function to generate random password
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}

const socketQuizController = async (quizId, teacherId, duration, memcached) => {
    try {
        const quizDetails = await getQuizDetailsFromDatabase(quizId, teacherId, pool);

        if (!quizDetails) {
            return { error: 'Quiz not found or unauthorized' };
        }

        const roomPassword = generateRandomPassword();

        return { quizDetails, roomPassword };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

module.exports = socketQuizController;
