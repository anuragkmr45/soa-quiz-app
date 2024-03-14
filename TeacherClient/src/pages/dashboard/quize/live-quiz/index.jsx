import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import CryptoJS from 'crypto-js';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

const LiveQuizes = () => {
    const [quizId, setQuizId] = useState('itersoaZR8T');
    const [quizPass, setQuizPass] = useState('');
    const [duration, setDuration] = useState('');
    const [quizCredentails, setQuizCredentails] = useState({
        qrUniqueId: '',
        isValid: true,
        quizId: '',
        password: ''
    });
    const [loading, setLoading] = useState(false)
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        let intervalId;
        if (showQR) {
            intervalId = setInterval(() => {
                handlegetQr();
            }, 5000);
        }
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showQR]);

    const handlegetQr = () => {
        try {
            const qrId = 'duniw7e8wfuc98nei3dwec';
            const qrExpire = new Date().getTime();

            const qrUniqueId = encryptData(qrId)
            const encryptedQuizId = encryptData(quizId);
            const encryptedPassword = encryptData(quizPass);

            const credentials = {
                qrUniqueId: qrUniqueId,
                expireDate: qrExpire,
                quizId: encryptedQuizId,
                password: encryptedPassword
            };
            setQuizCredentails(credentials)
        } catch (error) {
            console.error('Error while generating qr: ', error)
        }
    }

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
                    // console.log('res[omnse: ', response)
                    setQuizPass(response.data.RoomPassword)
                    // console.log(pass)
                    showSuccessToast(`Quiz Is Live Now for new ${duration} min !!`)

                    handlegetQr()

                    setShowQR(true);

                    setTimeout(() => {
                        setShowQR(false);
                    }, duration * 60000);
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

    const encryptData = (data) => {
        try {
            return CryptoJS.AES.encrypt(data, 'abcd').toString();
        } catch (error) {
            console.error('Error encrypting data:', error);
            throw error; // Rethrow the error to propagate it further if needed
        }
    };

    return (
        <DashBoard>
            {/* <AlertBox roomPassword={quizCredentails.password} /> */}
            <div className="min-h-screen flex justify-center items-center">
                {
                    showQR ? (
                        <div className="flex justify-center items-center p-10">
                            <QRCodeSVG
                                value={JSON.stringify(quizCredentails)}
                                size={300}
                                bgColor='black'
                                fgColor='white'
                                level={"M"}
                                includeMargin={false}
                            />
                            {/* <div className="space-x-4 flex">
                                <p className="bg-black text-white p-6">{quizId}</p>
                                <p className="bg-black text-white p-6">{quizCredentails.password}</p>
                            </div> */}
                        </div>
                    ) : (
                        <div className="p-8 rounded-lg shadow-2xl w-11/12 md:w-3/4">
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
