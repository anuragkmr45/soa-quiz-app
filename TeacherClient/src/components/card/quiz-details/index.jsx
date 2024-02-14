import React from 'react'

const QuizDetailCard = ({ quizTitle, quizId, date, time }) => {
    return (
        <div className="card my-5 max-w-full">
            <div className="card-body max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <h2 className="col-span-2 text-xl">{quizTitle}</h2>
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
        </div>
    )
}

export default QuizDetailCard
