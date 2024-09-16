import React, { useState } from 'react';
import styles from './Question.module.css';
import {FaPaperPlane} from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { apiClient } from '../../axios';


const LoadQuestion = ({ lecInfo }) => {

  const [loading, setLoading] = useState(false);
  const [dept, setDept] = useState('');
  const [level, setLevel] = useState('');
  const [course, setCourse] = useState('');
  const [code, setCode] = useState('');
  const [quest, setQuest] = useState('');
  const [ans, setAns] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [key3, setKey3] = useState('');
  const [key4, setKey4] = useState('');
  const [error, setError] = useState('');

  let payload ={
    dept,
    level,
    course,
    code,
    quest,
    ans,
    keys: [key1, key2, key3, key4],
    lecturerId: lecInfo.id
  }

  const handleSubmit = () => {
    setError('');
    setLoading(true);
    if(dept ==='' || level ==='' || course === '' || code ==='' ||quest ==='' ||
      ans === '' || key1 ==='' || key2 ==='' || key3 ==='' || key4 ===''
    ){
      setTimeout(() => {
        setError('Please fill out all Fields.');
        setLoading(false);
      }, 2000);
      return;
    }
    
    const upload = async () =>{
      await apiClient.post('/question', payload).then((result) => {
        if(result.data){
          console.log(result.data);
          alert(result.data);
          setTimeout(() => {
            setLoading(false);
            setDept('');
            setLevel('');
            setCourse('');
            setCode('');
            setQuest('');
            setAns('');
            setKey1('')
            setKey2('');
            setKey3('');
            setKey4('')
          }, 2000);
          return;
        }
      })
      setError('Ooops! Something went wrong. Check your network and try again.')
      setLoading(false);
    }
    upload();
  }

  return(
    <div className={styles.wrapDiv}>
      <div className={styles.titleText}>
        <h1>Upload Exam Questions</h1>
        <p >* Don't try to upload Bulk Questions</p>
      </div>
      <hr />
      <div className={styles.questForm}>
        <div className={styles.leftDiv}>
          <div className={styles.inputDiv}>
            <input type='text' name='Department' placeholder='Enter Department' required 
              onChange={(e) => setDept(e.target.value)}
              value={dept}
            />
          </div>
          {/* <div className={styles.inputDiv}>
            <input type='text' name='ExamCode' placeholder='Enter Examination Code' required 
              onChange={(e) => setDept(e.target.value)}
              value={dept}
            />
          </div> */}
          <div className={styles.inputDiv}>
            <textarea cols='3' rows='4' placeholder='Enter Exam Question' name='question' required 
              onChange={(e) => setQuest(e.target.value)}
              value={quest}
            />
          </div>
          <div className={styles.inputDiv}>
            <textarea cols='3' rows='5' placeholder='Enter Expected Answer' name='answer' required 
              onChange={(e) => setAns(e.target.value)}
              value={ans}
            />
          </div>
        </div>


        <div className={styles.rightDiv}>
          <div className={styles.inputDiv}>
            <input type='text' name='Level' placeholder='Enter Level' required 
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            />
          </div>
          <div className={styles.inputDiv}>
            <input type='text' name='CourseTitle' placeholder='Enter Course Title' required 
              onChange={(e) => setCourse(e.target.value)}
              value={course}
            />
            <input type='text' name='CourseCode' placeholder='Enter Course Code' required 
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.keyDiv}>
              <input className={styles.key} type='text' name='keyword1' placeholder='Enter Keyword' 
                onChange={(e) =>setKey1(e.target.value)}
                value={key1}
              />
              <input className={styles.key} type='text' name='keyword2' placeholder='Enter Keyword' 
                onChange={(e) =>setKey2(e.target.value)}  
                value={key2}  
              />
              <input className={styles.key} type='text' name='keyword3' placeholder='Enter Keyword' 
                onChange={(e) =>setKey3(e.target.value)} 
                value={key3} 
              />
              <input className={styles.key} type='text' name='keyword4' placeholder='Enter Keyword' 
                onChange={(e) =>setKey4(e.target.value)} 
                value={key4} 
              />
            </div>
          </div>
          <p className='text-danger font-weight-bold'>{error}</p>
          <div>
            { !loading ? <button className={styles.uploadBtn}
                onClick={() => handleSubmit()}
              ><FaPaperPlane /> Upload Question</button>:
              <Loader 
                width={80}
                height={80}
                color='#00c6ff'
                type='Bars'
              />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoadQuestion;