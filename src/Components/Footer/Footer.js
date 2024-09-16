import React from 'react';
import styles from './Footer.module.css';
import Images from '../../Assets/Images/Images';


const Footer = () => {

  return(
    <div className={styles.wrap}>
      <div >
        <div className={styles.logoDiv}>
          <img className={styles.ebsu} src={Images.aaua} alt='AAUA ' style={{ width: "100px", height: "100px"  }} />
          <div>
            <h5>Adekunle Ajasin Akungba Akoko</h5>
            <h6>Theory Examination Application</h6>
          </div>
        </div>
        <div>
          <h4>Get Lattest AAUA News!</h4>
          <form>
            <div className={styles.inputDiv}>
              <input type='text' placeholder='Enter your Email Address' required 
                className={styles.email}
              />
              <button type='submit' className={styles.sub}>Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <p> &copy; 2021 AAUA. All Rights Reserved.</p>
    </div>
  )
}
export default Footer;