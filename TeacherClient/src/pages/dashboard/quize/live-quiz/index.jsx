import React, { useState } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

const LiveQuizes = () => {
    // const [style, setStyle] = useState({ backgroundColor: '#FFFFFF', foregroundColor: '#000000' });
    const [quizId, setQuizId] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setstartTime] = useState('');
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

            if (startTime === '') {
                showErrorToast('Quiz start time is required')
            }

            // Parse the entered start time into hours and minutes
            const [hours, minutes] = startTime.split(':').map(Number);

            // Get the current time in milliseconds (only considering hours and minutes)
            const now = new Date();
            const currTime = now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000;

            // Calculate the start time in milliseconds
            const startTimeMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

            // Calculate the difference between startTimeMs and currTime in milliseconds
            const timeDifferenceMs = startTimeMs - currTime;

            // Convert 10 minutes to milliseconds
            const tenMinutesMs = 10 * 60 * 1000;

            if (timeDifferenceMs < tenMinutesMs) {
                showErrorToast('Quiz start time must be at least 10 minutes later than the current time.');
                return; // Stop further execution if the condition is not met
            }


            if (quizId !== '' && duration !== '' && startTime !== '' && timeDifferenceMs > tenMinutesMs) {
                const response = await apiEndpoints.teacher.createLiveQuiz({ quizId, duration, startTime });
                if (response.status === 200) {
                    // console.log(response.data.RoomPassword)
                    showSuccessToast(`Quiz Is Live Now for new ${duration} min !!`)
                    showSuccessToast(`Quiz will start at ${startTime}`)

                    const credentials = {
                        qrUniqueId: 'c8nwuc-fertg546y',
                        quizId: quizId,
                        password: response.data.RoomPassword
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

    // const generateUniqueID = () => {
    //     // Implement logic to generate unique ID
    //     return Math.random().toString(36).substring(7); // Example of generating random alphanumeric string
    // };

    // const generateNewStyle = () => {
    //     // Implement logic to generate new styles
    //     // For example, change background and foreground colors
    //     const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
    //     return {
    //         backgroundColor: randomColor(),
    //         foregroundColor: randomColor()
    //     };
    // };
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Generate new style every 2 seconds
    //         const newStyle = generateNewStyle();
    //         setStyle(newStyle);
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <DashBoard>
            {/* <AlertBox roomPassword={quizCredentails.password} /> */}
            <div className="min-h-screen flex justify-center items-center">
                {
                    showQR ? (
                        <div className="flex justify-center items-center p-10">
                            {/* <QRCodeSVG
                                value={JSON.stringify(quizCredentails)}
                                size={300}
                                // bgColor={"#000000"}
                                bgColor={style.backgroundColor}
                                fgColor={style.foregroundColor}
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
                            /> */}
                            <div className="space-x-4 flex">
                                <p className="bg-black text-white p-6">{quizId}</p>
                                <p className="bg-black text-white p-6">{quizCredentails.password}</p>
                            </div>
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
                                <input
                                    className="input-ghost-secondary input max-w-full text-primary"
                                    placeholder="Quiz Start Time in 24 Hours Format"
                                    value={startTime}
                                    onChange={(value) => { setstartTime(value.target.value) }}
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

// import React, { useState, useEffect } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import CryptoJS from 'crypto-js';
// import apiEndpoints from '../../../../services/api';

// import DashBoard from '../../../../components/frames/dashboard';
// import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

// const LiveQuizes = () => {
//     const [quizId, setQuizId] = useState('itersoaZR8T');
//     const [quizPass, setQuizPass] = useState('');
//     const [duration, setDuration] = useState('');
//     const [quizCredentails, setQuizCredentails] = useState({
//         qrUniqueId: '',
//         isValid: true,
//         quizId: '',
//         password: ''
//     });
//     const [loading, setLoading] = useState(false)
//     const [showQR, setShowQR] = useState(false);

//     useEffect(() => {
//         let intervalId;
//         if (showQR) {
//             intervalId = setInterval(() => {
//                 handlegetQr();
//             }, 5000);
//         }
//         return () => {
//             clearInterval(intervalId);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [showQR]);

//     const handlegetQr = () => {
//         try {
//             const qrId = 'duniw7e8wfuc98nei3dwec';
//             const qrExpire = new Date().getTime();

//             const qrUniqueId = encryptData(qrId)
//             const encryptedQuizId = encryptData(quizId);
//             const encryptedPassword = encryptData(quizPass);

//             const credentials = {
//                 qrUniqueId: qrUniqueId,
//                 expireDate: qrExpire,
//                 quizId: encryptedQuizId,
//                 password: encryptedPassword
//             };
//             setQuizCredentails(credentials)
//         } catch (error) {
//             console.error('Error while generating qr: ', error)
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         try {

//             if (quizId === '') {
//                 showErrorToast('Quiz Id is required !!')
//             }

//             if (duration === '') {
//                 showErrorToast('Quiz duration is required !!')
//             }

//             if (quizId !== '' && duration !== '') {
//                 const response = await apiEndpoints.teacher.createLiveQuiz({ quizId, duration });

//                 if (response.status === 200) {
//                     console.log('res[omnse: ', response)
//                     setQuizPass(response.data.RoomPassword)
//                     // console.log(pass)
//                     showSuccessToast(`Quiz Is Live Now for new ${duration} min !!`)

//                     handlegetQr()

//                     setShowQR(true);

//                     setTimeout(() => {
//                         setShowQR(false);
//                     }, duration * 60000);
//                 } else {
//                     console.error("Error while creating quiz live: ", response.status)
//                 }
//             }

//         } catch (error) {
//             console.error('Error creating live quiz:', error);
//         } finally {
//             setLoading(false)
//         }
//     };

//     const encryptData = (data) => {
//         try {
//             return CryptoJS.AES.encrypt(data, 'abcd').toString();
//         } catch (error) {
//             console.error('Error encrypting data:', error);
//             throw error; // Rethrow the error to propagate it further if needed
//         }
//     };

//     return (
//         <DashBoard>
//             {/* <AlertBox roomPassword={quizCredentails.password} /> */}
//             <div className="min-h-screen flex justify-center items-center">
//                 {
//                     showQR ? (
//                         <div className="flex justify-center items-center p-10">
//                             <QRCodeSVG
//                                 value={JSON.stringify(quizCredentails)}
//                                 size={300}
//                                 bgColor='black'
//                                 fgColor='white'
//                                 level={"M"}
//                                 includeMargin={false}
//                             />
//                             {/* <div className="space-x-4 flex">
//                                 <p className="bg-black text-white p-6">{quizId}</p>
//                                 <p className="bg-black text-white p-6">{quizCredentails.password}</p>
//                             </div> */}
//                         </div>
//                     ) : (
//                         <div className="p-8 rounded-lg shadow-2xl w-11/12 md:w-3/4">
//                             <form onSubmit={handleSubmit} className='text-center space-y-6'>
//                                 <input
//                                     className="input-ghost-secondary input max-w-full text-primary"
//                                     placeholder="Quiz ID"
//                                     value={quizId}
//                                     onChange={(value) => { setQuizId(value.target.value) }}
//                                     required
//                                 />
//                                 <input
//                                     className="input-ghost-secondary input max-w-full text-primary"
//                                     placeholder="Duration In Minutes"
//                                     value={duration}
//                                     onChange={(value) => { setDuration(value.target.value) }}
//                                     required
//                                 />

//                                 {
//                                     loading ? (
//                                         <button
//                                             className="btn btn-outline-secondary"
//                                         >
//                                             Loading ...
//                                         </button>
//                                     ) : (

//                                         <button
//                                             className="btn btn-outline-secondary"
//                                             type='submit'
//                                             onClick={handleSubmit}
//                                         >
//                                             Create Live Quiz
//                                         </button>
//                                     )
//                                 }

//                             </form>
//                         </div>
//                     )
//                 }

//             </div>
//         </DashBoard>
//     )
// }

// export default LiveQuizes
