import React, { useState } from 'react';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import AlertBox from '../../../../components/tosters/alert';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

const LiveQuizes = () => {

    const [quizId, setQuizId] = useState('');
    const [duration, setDuration] = useState('');
    const [roomPassword, setRoomPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            if (quizId === '') {
                showErrorToast('Quiz Id is required !!')
            }

            if (duration === '') {
                showErrorToast('Quiz duration is required !!')
            }

            if (quizId !== '' && duration !== '') {
                const response = await apiEndpoints.teacher.createLiveQuiz({ quizId, duration });
                if (response.status === 200) {
                    console.log(response)
                    showSuccessToast(`Quiz :- ${quizId} Is Live Now for new ${duration} min !!`)
                    const { roomPassword } = response;
                    setRoomPassword(roomPassword);
                } else {
                    console.error("Error while creating quiz live: ", response.status)
                }
            }

        } catch (error) {
            console.error('Error creating live quiz:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleCopyRoomPassword = async () => {
        try {
            if (roomPassword) {
                await navigator.clipboard.writeText(roomPassword);
                showSuccessToast('Room password copied to clipboard');
            }
        } catch (error) {
            console.error('Error copying room password:', error);
        }
    };

    console.log(roomPassword)

    return (
        <DashBoard>
            <AlertBox roomPassword={roomPassword} />
            <div className="min-h-screen flex justify-center items-center">
                {
                    roomPassword ? (
                        <div className="flex justify-center items-center space-x-5">
                            <p className="text-sm font-medium">Room Password :</p>
                            <p className="bg-gray-100 p-2 rounded-md text-black cursor-pointer" onClick={handleCopyRoomPassword} >
                                {roomPassword}
                            </p>
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

                                {
                                    loading ? (
                                        <button
                                            className="btn btn-outline-secondary"
                                        >
                                            Loading ...
                                        </button>
                                    ) : (

                                        <button
                                            className="btn btn-outline-secondary"
                                            type='submit'
                                            onClick={handleSubmit}
                                        >
                                            Create Live Quiz
                                        </button>
                                    )
                                }

                            </form>
                        </div>
                    )
                }

            </div>
        </DashBoard>
    )
}

export default LiveQuizes
