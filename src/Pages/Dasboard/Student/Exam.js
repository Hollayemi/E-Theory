import React, { useState } from 'react';
import Axios from 'axios';
import styles from './Exam.module.css'
import cx from 'classname';
import {FaBackward, FaChevronLeft, FaChevronRight, FaRegPaperPlane } from 'react-icons/fa';
import  Modals  from '../../../Components/Modal/Modals';
import { apiClient } from '../../axios';



const Exam = (props) =>{
  const examQuestions = props.exam;
  const user = props.user;
  //exan questions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Display exam questions
  const [takeExam, setTakeExam] = useState(false);
  const [code, setCode] = useState(' ');
  const [errMsg, setErrMsg] = useState('');

  const handleExam = () => {
    setErrMsg('');
    if(code === 'test'){
      setErrMsg('Please Enter Course Code to Start Your Exam.');
      return;
    }
    setTakeExam(true);
  }
  let exam = examQuestions.filter((exams) =>{
    return exams.course_code.toLowerCase() === code.toLowerCase();
  })
  //for submit button toggle
  const [showSubmit, setShowSubmit] = useState(false);

  let [nextQuest, setNextQuest] = useState(0);
  let [score, setScore] = useState([]);
  let [newAns, typeAns] = useState("")
  let [answers, setAns] = useState({});
  let [total, setTotal] = useState(0);

  console.log(answers, nextQuest)
  
  //submit answer
  const ansQust = (index) => {
    let mark = null;
    let unitScore = null;
    for (let i = 0; i < exam[nextQuest].keyword.length; i++) {
      if(answers[index].toLowerCase().includes(exam[nextQuest].keyword[i].toLowerCase())){
        mark  = 25;
        unitScore  += (mark/100)* 5;
    
    
        mark = ''
      }
      setAns('') 
    }

    //Prevents the addition of empty score when question length is exceeded.
    if(score.length === exam.length){
      return;
    }
    setScore(score =>([...score, unitScore]));
  }
  let studentTotalScore = null;
  //compute total score
  const totalScore = () => {
    let t = 0;
    console.log(`the score is ${score}`)
    score.forEach(value => {
  
      t += value;
      
    });
    setTotal(t)
    studentTotalScore = (t/(exam.length * 5)) * 100 + '%';

  }

  //handle exam questions
  const toggleQuestions = (option) => {
    if((exam.length -1) !== nextQuest && option ==='next'){
      setNextQuest(nextQuest + 1);
  
      return;
    }
    if(option ==='next' && (exam.length - 1) === nextQuest){
      setShowSubmit(true);
      return;
    }
    if(option === 'back' && nextQuest > 0){
      score.pop();
  
      setNextQuest(nextQuest - 1);
      setShowSubmit(false);
      return;
    }
    if(option === 'back' && score.length === 1){
      score.pop();
  
    }
  }

  //Uploading The Students Result to Server
  const uploadScore = async () => {
    
    let payload ={
      name: user.name,
      regNo: user.regNo,
      course_code: exam[0].course_code,
      answers,
    };
    let updatePayload = {
      regNo: user.regNo,
      code: exam[0].code,
      score: studentTotalScore
    };
    console.log(payload);

    // const recordExist = await apiClient.get(`/result/?regNo=${payload.regNo}&code=${payload.code}`);
    // if(recordExist.data[0].course_code === payload.code){
    //   console.log(recordExist.data);
    //   const updateRecord = await apiClient.put('/result/update',updatePayload);
    //   if(updateRecord.data.rowCount > 0){
    //     console.log('Score Saved!');

    //   }
    //   return;
    // }
    await apiClient.post('/result/upload',payload)
      .then((res) => {
        
        setTotal(res.data.total);
      });
  }

  return(
    <div>
      {!takeExam ?<>
          <div className={cx(styles.wrappers,'input-group input-group-lg mt-5')}>
            <input type='text' className='form-control' placeholder='Enter Course Code' 
              aria-describedby='take-exam' aria-label='Enter Course Code'
              onChange={(e) =>setCode(e.target.value)}
            />
            <div className='input-group-append' style={{cursor:'pointer'}}>
              <span className='input-group-text' id='take-exam'
                onClick={() =>handleExam()}
              >Take Exam</span>
            </div>
          </div>
          <p className={styles.error}>{errMsg}</p>
        </>:
        <>
          {exam.length ? <>
            <div className={styles.qBanner}>
              <p>{nextQuest + 1}/{exam.length}</p>
            </div>
            <div className={styles.ExamWrap}>
              <div>
                <div className={styles.quest}>
                  <p>{exam[nextQuest].question}</p>
                </div>
              </div>
              <div className='ansContainer'>
                <div className={styles.ans}>
                  <textarea cols='4' rows='3' placeholder="Enter Your Answer Here." 
                    value={newAns || answers[nextQuest]?.ans || ""}
                    onChange={(e) => typeAns(e.target.value)}
                  />
                </div>
                <div className={styles.toggle}>
                  <button className={styles.back}
                    onClick={() => {
                      newAns && setAns((prevAnswers) => { return {...prevAnswers,  [nextQuest]: {ans: newAns, examId: exam[nextQuest]._id}}});
                      toggleQuestions('back')}}
                  > <FaChevronLeft className={styles.icons} />Back</button>
                  <button className={styles.next}
                    onClick={() => {
                      newAns && setAns((prevAnswers) => { return {...prevAnswers,  [nextQuest]: {ans: newAns, examId: exam[nextQuest]._id}}});
                      typeAns("");
                      toggleQuestions('next');
                    }}
                  >Next <FaChevronRight className={styles.icons}/></button>
                </div>
                <div>
                  <button className={!showSubmit ? cx(styles.hide): cx(styles.submit) }
                    onClick={() =>{totalScore(); handleShow(); uploadScore();}}
                  ><FaRegPaperPlane className={styles.iconssub}/>Submit Answer</button>
                </div>
                <Modals show={show} handleClose={handleClose} handleShow={handleShow} title='Your Exam Score'>
                  <p>Your total Score is </p>
                  <p className='lead display-3'>{total ? `${total.toFixed(0)}%` : "loading"}</p>
                </Modals>
              </div>
            </div>
            </> :
            <div className='mt-5 text-center'>
              <p className={styles.error}>This exam is not scheduled for today. <br/> Please check the examination time table for more information!</p>
              <button className='btn btn-secondary btn-lg my-2'
                onClick={() => setTakeExam(false)}
              ><FaBackward /> Return</button>
            </div>
          }
        </>
      }
    </div>
  )
}
export default Exam;