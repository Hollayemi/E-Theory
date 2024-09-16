import React, { useEffect } from 'react';
import cx from 'classname';
import styles from './Home.module.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Carousels from './Carousels'
import Images from '../../Assets/Images/Images';


const Home = () => {

  //clears the key values used for authenticating users.
  useEffect(() => {
    localStorage.clear();
  },[]);

  return(
    <div>
      <Header />
      <Carousels />
      <Footer />
    </div>
  )
}
export default Home;