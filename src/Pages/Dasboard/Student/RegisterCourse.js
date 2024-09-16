import React, { useState } from 'react';
import styles from './RegisterCourse.module.css';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { apiClient } from '../../axios';



const Register = () =>{

    //Variable Declaration
  const [title, setCourse_Title] = useState('');
  const [code, setCourse_code] = useState('');
  const [semester, setSemester] = useState('');
  const [level, setLevel] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  //loader button setting
  const [loading, setLoding] = useState(false);
  const userType = JSON.parse(localStorage.getItem('userType'));
  console.log(userType)

  const regPayload = {
    title,
    code,
    semester,
    level,
    reg_no: userType.id
  }

  //Data validation and form submition
  const handleSubmit = () =>{
    //clear Error message
    setErrorMsg('');
    setLoding(true);
    //validate Input
    if(code === '' || title === '' || level === '' || semester === '' ){
      setTimeout(() => {
        setErrorMsg('Please Fill out all Fields.');
        setLoding(false);
      }, 1500);
      return;
    }
    //send data to server
    apiClient.post('/courses/register',regPayload)
      .then((rs) => {
        setLoding(false)
        setErrorMsg(rs.data);
        console.log(regPayload, rs)}
      )
      .catch(err => console.log(err))

      
  }
    //cancel reg process
  const cancelReg = () =>{
    setTimeout(() => {
      window.location.href='/dashboard/user';
    }, 2000);
  }

  return(
    <div>
        <div className={styles.formWrap}>
          <form onSubmit={(e) =>e.preventDefault()}>
            <p className={styles.error}>{errorMsg}</p>
            <div className={styles.inputDiv}>
              <input type='text' name='courseTitle' placeholder='Enter Course Title' required
                onChange={(e) =>setCourse_Title(e.target.value)}
              />
              <input type='text' name='CourseCode' placeholder='Enter Course Code' required 
                onChange={(e) =>setCourse_code(e.target.value)}
              />
            </div>
            <div className={styles.inputDiv}>
              <input type='text' name='semester' placeholder='Enter Semester' required
                onChange ={(e) =>setSemester(e.target.value)}
              />
              <input type='text' name='level' placeholder='Enter Level' required 
                onChange={(e) =>setLevel(e.target.value)}
              />
            </div>
            { !loading ? <div className={styles.btnDiv}>
                <button className={styles.cancel}
                    onClick={() =>cancelReg()}
                >Cancel</button>
                <button className={styles.reg}
                    onClick={() =>handleSubmit()}
                >Register</button>
              </div> :
              <div> 
                <Loader  style={{margin:'2px auto'}}
                  type="Bars"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            }
          </form>
      </div>
    </div>
  )
}
export default Register;