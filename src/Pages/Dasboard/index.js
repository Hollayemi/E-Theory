import React from 'react';
import { Redirect } from 'react-router';
import Lecturer from './Lecturer';
import Student from './Student';


const Dashboard = ( ) => {

  const userType = JSON.parse(localStorage.getItem('userType'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  if(admin != null && admin.admin){
    return<Lecturer name={admin.name} lecInfo={admin} />
  }
  if(userType.type === 'user'){
    return <Student name={userType.name} regNo={userType.regNo} />
  }

  return <Redirect to={{pathname: '/login'}} />
}
export default Dashboard;