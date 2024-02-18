const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/db'); // Ensure this path matches your project structure

// Promisify the memcached.get method for use with async/await
const getAsync = promisify(memcached.get).bind(memcached);

const joinLiveQuiz = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', details: 'No token found' });
    }

    try {
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        const registrationNumber = decoded.registrationNumber;

        const { quizId, password } = req.body;

        const roomKey = `quiz-room:${quizId}`;
        const data = await getAsync(roomKey); 

        if (!data) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const storedData = JSON.parse(data);
        if (password !== storedData.password) {
            return res.status(403).json({ error: 'Invalid password' });
        }

        // Fetch additional student details from the database using registration number
        const studentQuery = 'SELECT name, batch, branch, section FROM students WHERE registrationnumber = $1';
        const studentResult = await pool.query(studentQuery, [registrationNumber]);

        if (studentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Student details not found' });
        }

        // Prepare the response, excluding roomName, password, and answers
        const { roomName, password: pwd, answers, ...quizDetailsWithoutSensitiveInfo } = storedData;
        quizDetailsWithoutSensitiveInfo.studentDetails = studentResult.rows[0];

        res.json(quizDetailsWithoutSensitiveInfo);
        return {
            registrationNumber: decoded.registrationNumber,
            name: decoded.name,
            batch: decoded.batch,
            branch: decoded.branch,
            section: decoded.section,
        };
    } catch (error) {
        console.error('Error joining quiz:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Unauthorized', details: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = joinLiveQuiz;














// const Memcached = require('memcached');
// const memcached = new Memcached('localhost:11211');
// const jwt = require('jsonwebtoken');
// const pool = require('../../../config/db');

// const joinLiveQuizSocket = (io) => {
//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         socket.on('joinQuizRoom', async ({ token, quizId, password }) => {
//             try {
//                 console.log('Joining quiz room:', quizId);


//                 if (!token) {
//                     socket.emit('authenticationError', { error: 'Unauthorized', details: 'No token found' });
//                     return;
//                 }

//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 console.log('Decoded Token:', decoded);

//                 const registrationNumber = decoded.registrationNumber;
//                 console.log('Registration Number:', registrationNumber);

//                 const roomKey = `quiz-room:${quizId}`;
//                 memcached.get(roomKey, async (err, data) => {
//                     if (err || !data) {
//                         console.error('Quiz not found:', quizId); // Log quiz not found
//                         socket.emit('quizNotFound');
//                         return;
//                     }

//                     const storedData = JSON.parse(data);
//                     if (password !== storedData.password) {
//                         console.error('Invalid password for quiz:', quizId); // Log invalid password
//                         socket.emit('invalidPassword');
//                         return;
//                     }

//                     const quizDetails = storedData.quizDetails;

//                     // Fetch additional student details from the database using registration number
//                     const studentDetailsQuery = 'SELECT name, batch, branch, section FROM students WHERE registrationnumber = $1';
//                     const studentDetailsResult = await pool.query(studentDetailsQuery, [registrationNumber]);
//                     const studentDetails = studentDetailsResult.rows[0];

//                     if (!studentDetails) {
//                         console.error('Student details not found for registration number:', registrationNumber);
//                         socket.emit('serverError', { error: 'Student details not found' });
//                         return;
//                     }

//                     const response = {
//                         quizDetails,
//                         student: {
//                             registrationNumber,
//                             name: studentDetails.name,
//                             batch: studentDetails.batch,
//                             branch: studentDetails.branch,
//                             section: studentDetails.section,
//                         }
//                     };

//                     // Emit quiz details to the client
//                     socket.emit('quizDetails', response);
//                     console.log(response);
//                 });
//             } catch (error) {
//                 console.error('Error joining quiz:', error); // Log server error
//                 socket.emit('serverError', { error: 'Internal Server Error' });
//             }
//         });

//         socket.on('disconnect', () => {
//             console.log('User disconnected'); // Add logging for disconnection
//         });
//     });
// };

// module.exports = joinLiveQuizSocket;
