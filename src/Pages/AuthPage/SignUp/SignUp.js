import React, { useState } from 'react';
import style from './SignUp.module.css';
import Images from '../../../Assets/Images/Images';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { apiClient } from '../../axios';


const SignUp = () =>{
  // spiner loader
  const [loader, setLoader] = useState(false);
  const [student, setStudent] = useState(true);
  const userStatus = student ? 'Lecturer': 'Student'; //For alternation the login options
  const [errorMsg, setErrorMsg] = useState(''); // For handling error events
  const [msg, setMsg] = useState(''); //success message
  
  // dataset
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regNo, setRegNo] = useState('');
  const [dept, setDept] = useState('');
  const [level, setLevel] = useState('');

  const staffData ={
    fullName,
    email,
    password
  }
  const studentData ={
    fullName,
    regNo,
    password
  }
  //password validation and submision of form
  const handleSubmit =(e) =>{
    setLoader(true);
    setErrorMsg('');
    //Password validation
    if(password ===''){
      setTimeout(() => {
        setErrorMsg('Empty password is not allowed!');
        setLoader(false)
      }, 1500);
      return
    }
    //Handles staff input data validation
    if((fullName ==='' || email ==="") && !student){
      setTimeout(() => {
        setErrorMsg('Please fill out all fields.');
        console.log(student)
        setLoader(false)
      },1500);
      return;
    }

    //handle Student input data validation
    if(student && (dept ==='' || level ==='')){
      setTimeout(() => {
        setErrorMsg('Please Enter Your Department and Level.');
        
        setLoader(false)
      },1500);
      return;
    }
    if(password === confirmPassword){
      setErrorMsg('');
      // Handling Lecturers registration 
      if(!student){
        const register = async () => {
          try {
             apiClient.post('/staff/register', staffData).then((result) => {
            if(result.status === 200){
              console.log(result.data)
              setMsg('Registration successful! Redirecting...');
              setTimeout(() => {
                window.location.href = '/login';
              }, 4000);
            }
          })
          } catch (err) {
            console.log({erro:err});
            setErrorMsg('Oops! Something went wrong. Check Your Network and try again.');
            setLoader(false);
          }
        } 
        register();
      }
      //Handles Student Registration
      else{
        const register = async () => {
          try {
            await apiClient.post('/student/register', studentData).then((result) => {
            if(result.status === 200){
              console.log(result.data)
              setMsg('Registration successful! Redirecting...');
              setTimeout(() => {
                window.location.href = '/login';
              }, 4000);
            }
            })
          } catch (err) {
            console.log({erro:err});
            setErrorMsg('Oops! Something went wrong. Check Your Network and try again.');
            setLoader(false);
          }
        } 
        register();
      }
      return
    }
    
    setTimeout(() => {
      setLoader(false);
      setErrorMsg('Password do not match.');
    }, 2000);

  }
  return(
    <div className={style.signupWrap}>
      <div className={style.headerText}>
        <img src={Images.aaua} alt='school logo' style={{ width: "100px", height: "100px"}} />
        <h4>Welcome </h4>
        <p>Create an Account to get started.</p>
      </div>
      <p id={style.s_log}>{userStatus}? <span onClick={()=>{setStudent(!student);setLoader(false);setErrorMsg('')}} className={style.staff}>Signup Here.</span></p>
      <form className={style.sForm}  onSubmit={(e)=>e.preventDefault()}>
        <div className={style.inputDiv}>
          <input type='text' placeholder='Full Name' required name='FullName' 
            onChange={(e)=>setFullName(e.target.value)}
          />
          <input type={student? 'text' : 'email'} placeholder={student? 'Reg No.' : 'Email Address'} required name={student? 'RegNo' : 'email'} 
            onChange={student ? (e)=>setRegNo(e.target.value) : (e) =>setEmail(e.target.value)}
          />
        </div>
        <div className={student? style.inputDiv : style.hide}>
          <input type='text' placeholder='Department' name='Department'
            onChange={(e)=>setDept(e.target.value)}
          />
          <input type='text' placeholder='Level' name='Level'
            onChange ={(e)=>setLevel(e.target.value)}
          />
        </div>
        <div className={style.inputDiv}>
          <input type='password' placeholder='Password' required name='Password'
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input type='password' placeholder='Confirm Password' required name='confirmPassword'
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </div>
        <p id={style.error}>{errorMsg}</p>
        <p className='text-success'>{msg}</p>
        <div>
          {!loader ? <button id={style.sendBtn} onClick={()=>handleSubmit()}>Create Account</button> :
          
            <Loader  style={{margin:'2px auto'}}
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
            />
          }
        </div>
        <p>Already have an Account?<Link className={style.login} to='/login'>Login Here.</Link></p>
      </form>

    </div>
  )
}
export default SignUp;