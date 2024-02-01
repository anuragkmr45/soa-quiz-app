const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const jwt = require('jsonwebtoken');
const socketQuizController = require('./socketQuizController'); 

const createQuizLive = async (req, res, io) => {
    try {
        // Teacher verification
        const token = req.header('Authorization');

        // Verify the token
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        const teacherId = decoded.teacherId;

        // Get quiz ID and duration from the request
        const { quizId, duration } = req.body;

        // Fetch quiz details and generate a random password
        const { quizDetails, roomPassword } = await socketQuizController(quizId, teacherId, duration, memcached);

        // Store quiz details and password in Memcached
        const roomKey = `quiz-room:${quizId}`;
        const roomData = {
            quizDetails,
            password: roomPassword,
        };

        memcached.set(roomKey, JSON.stringify(roomData), duration * 60 * 1000, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Create a socket.io room for the live quiz
            const roomName = `quiz-room-${quizId}`;
            const room = io.of('/').in(roomName);

            // Set up event handlers for real-time quiz interactions
            room.on('connection', (socket) => {
                // Emit quiz data (excluding answers) to connected students
                socket.emit('quizData', quizDetails);

                // Handle the real-time timer
                const timerDuration = duration * 120 * 1000; // Convert minutes to milliseconds
                let timeLeft = timerDuration;

                const timerInterval = setInterval(() => {
                    timeLeft -= 1000; // Reduce time left by 1 second
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        room.emit('timerEnd'); // Notify clients that the timer has ended
                        room.disconnectSockets(true); // Disconnect clients and close the room
                    }
                }, 1000);
            });

            // Return the generated password to the teacher
            res.json({ roomPassword });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = createQuizLive;
