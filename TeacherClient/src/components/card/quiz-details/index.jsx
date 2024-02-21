import React from 'react';
import apiEndpoints from '../../../services/api';

const QuizDetailCard = ({ quizTitle, quizId, date, time }) => {

    const fetchQuizDtls = async () => {
        try {
            const res = await apiEndpoints.teacher.getQuizDetails(quizId)
            console.log(res)
        } catch (error) {
            console.error(`Error while fetching ${quizId} details: `, error)
        }
    }

    return (
        <div className="card my-5 max-w-full">
            <div className="card-body max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className='col-span-2 space-y-4' >
                        <h2 className="text-xl">{quizTitle}</h2>
                        <label className="btn btn-outline-secondary" onClick={fetchQuizDtls} htmlFor="quiz-dtl">More Details ... </label>
                    </div>
                    <div className="col-span-1">
                        <p>
                            <b>Quiz ID: </b> {quizId}
                        </p>
                        <small>
                            <b>Created At: </b> {date} <br />
                            <b>Time: </b> {time} <br />
                        </small>
                    </div>
                </div>
            </div>

            <input className="modal-state" id="quiz-dtl" type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="quiz-dtl"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                    <label htmlFor="quiz-dtl" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h2 className="text-xl">{quizTitle} : ({quizId})</h2>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!</span>
                    {/* <div className="flex gap-3">
                        <button className="btn btn-error btn-block">Delete</button>
                        <button className="btn btn-block" htmlFor="quiz-dtl">Cancel</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default QuizDetailCard;
