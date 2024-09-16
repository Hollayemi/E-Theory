import React from 'react';
import styles from './Lecturer.module.css';
import Images from '../../../Assets/Images/Images';


const Home = () =>{

  return (
    <>
      <img className={styles.paper} src={Images.questionPaper} alt='question paper' />
      <div className={styles.banner}>
        <h1 className={styles.title}>Flexible and Efficient Marking</h1>
        <p className={styles.textP}>Configure your assessment workflows and 
          test settings, and extend functionality. 
          With precise annotations and criteria-based marks, 
          tailored by workflow configuration allowing for double-blinded 
          marking and more.
        </p>
      </div>
      <div className={styles.listing}>
        <div className={styles.itemS}>
          <h4>450+</h4>
          <p>Registered Students</p>
        </div>
        <div className={styles.itemS}>
          <h4>158+</h4>
          <p>Questions</p>
        </div>
        <div className={styles.itemS}>
          <h4>315+</h4>
          <p>Generated Results</p>
        </div>
      </div>
    </>
  )
}
export default Home;