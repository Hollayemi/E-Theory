import React, {useState} from 'react';
import styles from './Result.module.css'



const Result = ({regNo,name, results}) =>{
console.log(results)
  const headers = {"s/n":'', name:'', regNo:'', course:'', score:''}
  let tableHeader = () => {
    let header = Object.keys(headers);
    return header.map((key, index) => {
      return<th key={index}>{key.toUpperCase()}</th>
    })
  }

  let renderTable = (data) => {
    return data.map((result, index) => {
      return<tr key={result.id}>
        <td>{++index}</td>
        <td>{name}</td>
        <td>{result.regNo}</td>
        {/* <td>{result.course_title}</td> */}
        <td>{result.course_code}</td>
        <td>{result.score?.toFixed(2)}</td>
      </tr>
    })
  };

  const [courseCode, setcourseCode] = useState('');
  const [warning, setWarning] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleDisplay = () => {
    setWarning('');
    if(courseCode === ''){
      setWarning('Please Type Course Title in the box above.');
      return
    }
    setShowResult(true);
    setcourseCode('');
  }
  let filtered = results.filter((result) =>{
    return result.course_code.toLowerCase() === courseCode.toLowerCase();
  })
  
  return(
    <div>
      <div className={styles.header}>
        <h1>View Exam Results</h1>
        <div className={styles.form}>
          <input type='text' name='course' placeholder='Enter Course Title' required
            onChange={(e) => setcourseCode(e.target.value)}
            value={courseCode}
          />
          <button id={styles.filter}
            onClick={() =>handleDisplay()}
          >Show Result</button>
          <button id={styles.all} 
            onClick={() => {setcourseCode(''); setShowResult(true)}}
          >All Result</button> 
        </div> 
      </div>
      <p className={styles.warn}>{warning}</p>
      <div className={styles.tableContainer}>
        {
          showResult ?  
          <table>
            <thead>
              <tr>
                {tableHeader()}
              </tr>
            </thead>
            <tbody>
            {courseCode !== ''?( 
              renderTable(filtered)
            ): renderTable(results)}
            </tbody>
          </table>: null
        }
      </div>
    </div>
  )
}
export default Result;