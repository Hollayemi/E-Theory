import React, { useState } from 'react';
import styles from './ViewResult.module.css';
import Axios from 'axios';
import cx from 'classname';
import { apiClient } from '../../axios';


const ViewQuestions = () =>{
    const [code, setCode] = useState();
    const [questions, setQuestions] = useState([]);
    const showQuestions = async () => {
        await apiClient.get(`/questions/${code}`).then((request) => {;
        setQuestions(request.data)
        })
    }
    const startExam = async () => {
        await apiClient.put(`/exam/start/${code}`).then((request) => {;
        setQuestions(request.data)
        })
    }
  return(
    <div className={styles.wraps}>
      <div className={styles.header}>
        <h1>View Uploaded Questions</h1>
        <div className={cx(styles.wrappers,'input-group input-group-lg mt-5 w-10')}>
            <input type='text' className='form-control' placeholder='Enter Course Code' 
              aria-describedby='take-exam' aria-label='Enter Course Code'
              onChange={(e) =>setCode(e.target.value)}
            />
            <div className='input-group-append' style={{cursor:'pointer'}}>
              <span className='input-group-text' id='take-exam'
                onClick={() =>showQuestions()}
              >Show Questions</span>
            </div>
          </div>
      </div>

      <div className={styles.tableContainer}>
        <table>
          {questions.length && <div className='input-group-append' style={{cursor:'pointer'}}>
              <span className='input-group-text' id='take-exam'
                onClick={() =>startExam()}
              >Start Exam</span>
            </div>}
          <thead>
            <tr>
              <td>S/N</td>
              <td>Code</td>
              <td>status</td>
              <td>Question</td>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i ) => (
                <tr>
                    <td>{i+1}</td>
                    <td>{q.start ? "Started": "Not Started"}</td>
                    <td>{q.course_code}</td>
                    <td>{q.question}</td>
                </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}
export default ViewQuestions;