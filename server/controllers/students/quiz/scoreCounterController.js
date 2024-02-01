const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const pool = require('../../../config/db');

// Function to calculate score
function calculateScore(quizData, studentResponses) {
    let score = 0;
    studentResponses.forEach(response => {
        const questionData = quizData.find(q => q.question === response.question);
        if (questionData && questionData.answer === response.answer) {
            score++;
        }
    });
    return score;
}

const scoreCounter = async (req, res) => {
    try {
        const { registrationNumber, quizId, responses } = req.body;

        const roomKey = `quiz-room:${quizId}`;
        memcached.get(roomKey, async (err, data) => {
            if (err || !data) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            const { quizDetails } = JSON.parse(data);
            const score = calculateScore(quizDetails.quizData, responses);

            const insertScoreQuery = 'INSERT INTO results (registrationnumber, quizid, score) VALUES ($1, $2, $3)';
            await pool.query(insertScoreQuery, [registrationNumber, quizId, score]);

            res.json({ success: true, score });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = scoreCounter;
