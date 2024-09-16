import React from 'react';
import styles from './ViewResult.module.css';


const ViewResult = () =>{

  return(
    <div className={styles.wraps}>
      <div className={styles.header}>
        <h1>View Exam Results</h1>
        <form>
          <input type='text' name='course_title' placeholder='Enter Course Title' required/>
          <input type='text' name='course' placeholder='Enter Course Code' required/>
          <button>Show Result</button>
        </form>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <td>S/N</td>
              <td>Students</td>
              <td>Scores</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Francis Ogbonna</td>
              <td>76%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Francis Ogbonna</td>
              <td>76%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Francis Ogbonna</td>
              <td>76%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Francis Ogbonna</td>
              <td>76%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ViewResult;