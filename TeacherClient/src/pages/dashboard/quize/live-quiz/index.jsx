import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { encrypt } from 'n-krypta';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

const LiveQuizes = () => {
    const [quizId, setQuizId] = useState('');
    const [duration, setDuration] = useState('');
    const [quizCredentails, setQuizCredentails] = useState();
    const [loading, setLoading] = useState(false)
    const [showQR, setShowQR] = useState(false);

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
                    showSuccessToast(`Quiz Is Live Now for new ${duration} min !!`)

                    const encryptionKey = 'njfieuro98w4irfn0i49';
                    const uniqueQrID = 'c8nwuc-fertg546y';
                    // const qrId = encrypt(uniqueQrID, encryptionKey)
                    // const quizKey = encrypt(quizId, encryptionKey);
                    const quizValue = encrypt(response.data.RoomPassword, encryptionKey);

                    const credentials = {
                        qrUniqueId: uniqueQrID,
                        quizId: quizId,
                        password: quizValue
                    };
                    // console.log(response.data.RoomPassword)
                    setShowQR(true);
                    setQuizCredentails(credentials)

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
                                // bgColor={"#000000"}
                                // bgColor={style.backgroundColor}
                                // fgColor={style.foregroundColor}
                                bgColor='black'
                                fgColor='white'
                                // fgColor={"#ffffff"}
                                level={"M"}
                                includeMargin={false}
                            // imageSettings={{
                            //     src: "https://static.zpao.com/favicon.png",
                            //     x: undefined,
                            //     y: undefined,
                            //     height: 24,
                            //     width: 24,
                            //     excavate: true,
                            // }}
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
