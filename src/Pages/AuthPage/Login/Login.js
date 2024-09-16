import React, { useState } from 'react';
import cx from 'classname';
import styles from './Login.module.css';
import Images from '../../../Assets/Images/Images'
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Axios from 'axios';

const Login = () =>{
    
  const [loading, setLoading] = useState(false);
  const [password, setPassword] =useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [student, setStudent] = useState(true);
  const [msg, setMsg] = useState('');

  //login credentials
  const payload = {
    userName,
    password
  }

  const handleSubmit = () =>{
    setError('');
    setLoading(true);
    //validate input data
    if(password === '' || userName === ''){
      setTimeout(() => {
        setError('Please Enter Username and Password.');
        setLoading(false);
      }, 1500);
      return;
    }
    if(!student){
      const login = async () => {
        try {
          const result = await Axios.post("http://localhost:3020/staff/login",payload)
          console.log(result)
          if(result.data){
            console.log(result.data)
            let details ={admin:true, name: result.data.fullName, id: result.data._id};
            
            localStorage.setItem('admin',JSON.stringify(details));
            setMsg('Redirecting...');
          }
          setTimeout(() => {
            window.location.href='/dashboard/user/lecturer';
          }, 4000);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError('Invalid Username and Password!');
        }
      }     
      login();
      return;
    }
    const login = async () => {
      try {
        const result = await Axios.post("http://localhost:3020/student/login",payload)
        if(result.data){
          let details = {type:'user',name:result.data.fullName, regNo:result.data.regNo, id: result.data._id}
          localStorage.setItem("userType",JSON.stringify(details));
          setMsg('Redirecting...');
        }
        setTimeout(() => {
          window.location.href='/dashboard/user';
        }, 4000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('Invalid Username and Password!');
      }
    }     
    login();
  }
  

  return(
    <div className={styles.loginWrap}>
      <img id={styles.logos} src={Images.aaua} alt='school logo' style={{ width: "100px", height: "100px"}} />
      <h4>Welcome Back</h4>
      <p>Login to access portal</p>
      <div>
        <Link to='/' id={styles.link} className='display-5'>Home</Link>
        <p className={styles.loginOption}
          onClick={() => setStudent(!student)}
        >{student ? 'Not a Student?': <>Not a Lecturer?</>} <span>Login Here.</span></p>

        <form className={styles.logForm} onSubmit={(e)=>e.preventDefault()}>
          <div className={styles.inputContainer}>
            <input type={student?'text' :'email'}  placeholder={student?'Enter Reg.No' :'Enter your email'} required 
              onChange={(e) =>setUserName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input type='password' placeholder='Enter Password' required 
              onChange={(e) =>setPassword(e.target.value)}
            />
          </div>
          <div className={cx(styles.remDiv)}>
            <p><input type='checkbox' />Remember Me.</p>
            <p>Forgot Password?</p>
          </div>
          <p className={styles.error}>{error}</p>
          <p className='text-success'>{msg}</p>
          <div className={styles.authDiv}>
            {!loading ? <button className={cx(styles.logBtn)} onClick={()=>handleSubmit()}>Login</button>:
              <Loader  style={{margin:'2px auto'}}
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={80}
              />
            }
          </div>
          <p>Don't have an Account? <Link to='/register' className={styles.reg}>Register Here.</Link></p>
        </form>
      </div>
    </div>
  )
}
export default Login;