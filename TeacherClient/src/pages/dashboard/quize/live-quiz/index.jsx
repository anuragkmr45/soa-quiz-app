import React, { useState } from 'react';
import DashBoard from '../../../../components/frames/dashboard';
import apiEndpoints from '../../../../services/api';

const LiveQuizes = () => {

    // State for quiz ID and duration
    const [quizId, setQuizId] = useState('');
    const [duration, setDuration] = useState('');

    // State for room password
    const [roomPassword, setRoomPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the API endpoint to create live quiz
            const response = await apiEndpoints.teacher.createLiveQuiz({ quizId, duration });

            if (response.status === 200) {
                const { roomPassword } = response.data;
                setRoomPassword(roomPassword);
                // setError('');
            } else {
                // setError('Failed to create live quiz');
                console.error("Error while creating quiz live: ", response.status)
            }
        } catch (error) {
            console.error('Error creating live quiz:', error);
            // setError('Internal Server Error');
        }
    };


    return (
        <DashBoard>
            <div className="min-h-screen flex justify-center items-center">

                {
                    roomPassword ? (
                        <div className="flex justify-center items-center">
                            <p className="text-sm font-medium">Room Password:</p>
                            <p className="bg-gray-100 p-2 rounded-md">{roomPassword}</p>
                        </div>
                    ) : (
                        <div className="bg-gray-300 p-8 rounded-lg shadow-md w-3/4">
                            <h1 className="text-2xl font-bold mb-4 text-black">Create Live Quiz</h1>
                            <form onSubmit={handleSubmit} className='text-center'>
                                <div className="mb-4 flex">
                                    <input
                                        className="input-ghost-secondary input max-w-full text-primary"
                                        placeholder="Quiz ID"
                                        value={quizId}
                                        onChange={(value) => { setQuizId(value.target.value) }}
                                        required
                                    />
                                </div>
                                <div className="mb-4 flex">
                                    <input
                                        className="input-ghost-secondary input max-w-full text-primary"
                                        placeholder="Duration In Minutes"
                                        value={duration}
                                        onChange={(value) => { setDuration(value.target.value) }}
                                        required
                                    />
                                </div>
                                <button
                                    className="btn btn-outline-secondary"
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    Create Live Quiz
                                </button>
                            </form>
                        </div>
                    )
                }

            </div>
        </DashBoard>
    )
}

export default LiveQuizes
