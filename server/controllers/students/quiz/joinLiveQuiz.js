const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const socketIO = require('socket.io');
const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');

// Authentication of student and details decoding from the token
const authenticateStudentToken = (token) => {
    try {
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        return { 
            registrationNumber: decoded.registrationNumber,
            name: decoded.name,
            batch: decoded.batch,
            branch: decoded.branch,
            section: decoded.section,
        };
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

const joinLiveQuizSocket = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        socket.on('joinQuizRoom', async ({ quizId, password, token }) => {
            try {
                const student = authenticateStudentToken(token);
                if (!student) {
                    socket.emit('authenticationError');
                    return;
                }

                const roomKey = `quiz-room:${quizId}`;
                memcached.get(roomKey, async (err, data) => {
                    if (err || !data) {
                        console.error(err);
                        socket.emit('quizNotFound');
                        return;
                    }

                    const storedData = JSON.parse(data);
                    if (password !== storedData.password) {
                        socket.emit('invalidPassword');
                        return;
                    }

                    const quizDetails = storedData.quizDetails;

                    // Fetch additional student details from the database
                    const studentDetailsQuery = 'SELECT name, batch, branch, section FROM students WHERE registrationnumber = $1';
                    const studentDetailsResult = await pool.query(studentDetailsQuery, [student.registrationNumber]);
                    const studentDetails = studentDetailsResult.rows[0];

                    const response = {
                        quizDetails,
                        student: {
                            registrationNumber: student.registrationNumber,
                            name: studentDetails.name,
                            batch: studentDetails.batch,
                            branch: studentDetails.branch,
                            section: studentDetails.section,
                        }
                    };

                    socket.emit('quizDetails', response);
                });
            } catch (error) {
                console.error(error);
                socket.emit('serverError');
            }
        });
    });
};

module.exports = joinLiveQuizSocket;
