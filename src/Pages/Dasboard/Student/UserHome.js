import React from 'react';
import styles from './UserHome.module.css'
import Images from '../../../Assets/Images/Images';



const UserHome = () =>{

  return(
    <div>
      <div className={styles.hero}>
        <img className={styles.heroImage} src={Images.student} alt='student' />
        
        <div className={styles.animated_shadow_quote}>
          <blockquote>
          <p>Make your life a masterpiece; imagine no limitations on what you can be, have or do.</p>
              <cite>Bryan Tracy</cite>
          </blockquote>
        </div>
      </div>
      <div className={styles.banner}>
        <h1>Nigerian Young Academy Call for Membership</h1>
        <p>Get Registered and stand a chance to win a scholarship</p>
        <button>SignUp Now</button>
      </div>
    </div>
  )
}
export default UserHome;