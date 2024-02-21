import React, { useState } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

import { topicDtls } from '../../../../.data/subjectData';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import QuestionCard from '../../../../components/card/question-card'

const AddQuizes = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);

    const navigate = useNavigate()
    const handleFileChange = (event) => {
        try {
            const file = event.target.files[0];
            setCsvFile(file);
        } catch (error) {
            console.error('Error while fetching csv data: ', error)
        }
    };

    const handleConvert = () => {
        if (!csvFile) {
            alert('Please select a CSV file.');
            return;
        }

        Papa.parse(csvFile, {
            complete: (result) => {
                const headers = result.data[0];
                const jsonData = result.data.slice(1).map((row) => {
                    const question = {};
                    headers.forEach((header, index) => {
                        if (header === 'Options') {
                            question[header] = row[index].split(',').map((option) => option.trim());
                        } else {
                            question[header] = row[index];
                        }
                    });
                    return question;
                });

                const currentDate = new Date().toISOString().split('T')[0];
                const finalJsonData = {
                    Title: title,
                    Description: desc,
                    DateCreated: currentDate,
                    SubjectID: selectedSubject ? selectedSubject.value : null,
                    TopicName: selectedSubject ? selectedSubject.label : null,
                    Questions: jsonData.filter(row => Object.values(row).every(val => val !== null && val !== ''))
                };

                setJsonData(finalJsonData);
            },
        });
    };

    const subjectOptions = topicDtls.map((subject) => ({
        value: Object.keys(subject)[0],
        label: Object.values(subject)[0],
    }));

    const handleSubmitQuiz = async () => {
        setLoading(true);
        try {
            if (!jsonData || !jsonData.Title || !jsonData.Questions || !jsonData.Questions.length) {
                throw new Error('Quiz data is incomplete.');
            }
            // console.log('jsonData: ', jsonData)
            const res = await apiEndpoints.teacher.createQuiz(jsonData);
            // console.log(res)

            if (res.status === 201) {
                navigate('/dashboard/previous-quizes')
            }

            setLoading(false);
        } catch (error) {
            console.error('Error while submitting quiz: ', error);
            setLoading(false);
        }
    }

    return (
        <DashBoard>
            <section className='w-full'>
                {
                    jsonData ? (
                        <aside className='p-5'>
                            {
                                jsonData && !loading ? (
                                    <>
                                        {
                                            jsonData.Questions.map((data, index) => (
                                                <QuestionCard
                                                    key={index}
                                                    index={index}
                                                    question={data.Question}
                                                    option1={data.Option1}
                                                    option2={data.Option2}
                                                    option3={data.Option3}
                                                    option4={data.Option4}
                                                    answer={data.Answer}
                                                />
                                            ))
                                        }
                                        <button
                                            className="btn btn-outline-secondary w-full"
                                            onClick={handleSubmitQuiz}
                                        >
                                            Submit Quiz
                                        </button>
                                    </>
                                ) : (
                                    <h1>Loading...</h1>
                                )
                            }
                        </aside>
                    ) : (
                        <div className="grid grid-row-2 gap-4">
                            <div className="relative">
                                <input
                                    className="input-ghost-secondary input max-w-full"
                                    placeholder="Quiz Title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <textarea
                                className="textarea-ghost-secondary textarea  max-w-full"
                                placeholder="Quiz Description"
                                value={desc}
                                onChange={(event) => setDesc(event.target.value)}
                            />
                            <div className="relative">
                                <Select
                                    placeholder="Select Subject"
                                    options={subjectOptions}
                                    value={selectedSubject}
                                    onChange={(value) => setSelectedSubject(value)}
                                    className='input-ghost-secondary input max-w-full'
                                />
                            </div>
                            <input
                                type="file"
                                className="input-file input-file-secondar input-ghost-secondary  max-w-full"
                                accept=".csv"
                                onChange={handleFileChange}
                            />
                            <button className='btn btn-outline-secondary ' onClick={handleConvert}>Review Quizes</button>
                        </div>
                    )
                }
            </section>
        </DashBoard>
    )
}

export default AddQuizes;
