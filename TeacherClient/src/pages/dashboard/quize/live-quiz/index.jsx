import React, { useState, useEffect } from 'react';
import DashBoard from '../../../../components/frames/dashboard';
import apiEndpoints from '../../../../services/api';
import AlertBox from '../../../../components/tosters/alert';

const LiveQuizes = () => {

    const [alertVisibility, setAlertVisibility] = useState(true);
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
    const handleAlertVisibility = () => {
        try {
            setAlertVisibility(false);
        } catch (error) {
            console.error('Error while ahndling alert: ', error);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleAlertVisibility();
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <DashBoard>
            <AlertBox />
            <div className="min-h-screen flex justify-center items-center">

                {
                    roomPassword ? (
                        <div className="flex justify-center items-center">
                            <p className="text-sm font-medium">Room Password:</p>
                            <p className="bg-gray-100 p-2 rounded-md">{roomPassword}</p>
                        </div>
                    ) : (
                        <div className="p-8 rounded-lg shadow-2xl w-3/4">
                            <form onSubmit={handleSubmit} className='text-center space-y-6'>
                                <input
                                    className="input-ghost-secondary input max-w-full text-primary"
                                    placeholder="Quiz ID"
                                    value={quizId}
                                    onChange={(value) => { setQuizId(value.target.value) }}
                                    required
                                />
                                <input
                                    className="input-ghost-secondary input max-w-full text-primary"
                                    placeholder="Duration In Minutes"
                                    value={duration}
                                    onChange={(value) => { setDuration(value.target.value) }}
                                    required
                                />
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
