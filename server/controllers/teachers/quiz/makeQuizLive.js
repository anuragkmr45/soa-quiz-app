const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');
const jwt = require('jsonwebtoken');
const socketQuizController = require('./socketQuizController'); 
const createQuizLive = async (req, res) => {
    try {
        // Teacher verification
        
        console.log('Attempting to create a live quiz...');
        const token = req.header('Authorization');
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'Unauthorized', details: 'No token found' });
        }

        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        const teacherId = decoded.teacherId;
        console.log(`Teacher ID decoded: ${teacherId}`);

        // Get quiz ID and duration from the request
        const { quizId, duration } = req.body;
        console.log(`Creating quiz live: QuizID=${quizId}, Duration=${duration} minutes`);

        // Fetch quiz details and generate a random password
        const { quizDetails, roomPassword } = await socketQuizController(quizId, teacherId, duration, memcached);

        // Room key and data preparation
        const roomKey = `quiz-room:${quizId}`;
        const roomData = {
            quizDetails,
            password: roomPassword,
            roomName: `quiz-room-${quizId}` // Including roomName in stored data
        };

        // Store quiz details in Memcached
        memcached.set(roomKey, JSON.stringify(roomData), duration * 60, (err) => {
            if (err) {
                console.error('Memcached set error:', err);
                return res.status(500).json({ error: 'Internal Server Error', details: 'Failed to store quiz details in Memcached' });
            }

            console.log(`Quiz details stored in Memcached: Key=${roomKey}`);

        
            // Instead, focus on ensuring the quiz details are retrievable for the duration of the quiz

            // Respond to the teacher with the room password and name
            res.json({ "RoomPassword": roomPassword, "RoomName": roomData.roomName });

            // Debug: Check if quiz details are correctly stored in Memcached
            memcached.get(roomKey, (error, data) => {
                if (error) {
                    console.error('Error retrieving quiz details from Memcached:', error);
                    return;
                }
                if (data) {
                    console.log('Quiz details successfully retrieved from Memcached for verification:', JSON.parse(data));
                } else {
                    console.log('Quiz details not found in Memcached post-storage (unexpected).');
                }
            });
        });
    } catch (error) {
        console.error('Error in createQuizLive:', error);
        res.status(500).json({ error: 'Internal Server Error', details: 'Exception caught in createQuizLive' });
    }
};

module.exports = createQuizLive;
