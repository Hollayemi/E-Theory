import React from 'react';
import styles from './Header.module.css';
import cx from 'classname';
import Images from '../../Assets/Images/Images';
import {FaFacebook, FaTwitter, FaInstagramSquare} from 'react-icons/fa';
import Hamburger from './Hamburger';


const Headers = () =>{

  return(
    <div style={{position:'sticky', top:0, left:0,zIndex:50,background:' rgb(212, 206, 206)'}}>
      <div className={styles.imageDiv}>
        <div className={cx(styles.logoDiv)}>
          <img className={cx(styles.ebsu)} src={Images.aaua} alt='AAUA ' style={{ width: "100px", height: "100px"  }} />
          <div>
            <h4>Adekunle Ajasin Akungba Akoko</h4>
            <h5>Theory Examination Application</h5>
          </div>
        </div>
        <span className={cx(styles.icon_container)}>
          <FaFacebook className={cx(styles.icons)} />
          <FaTwitter className={cx(styles.icons)} />
          <FaInstagramSquare className={cx(styles.icons)} />
        </span>
      </div>
      <div className={cx(styles.headWrap)}>
        <img className={cx(styles.logo)} src={Images.eLogo} alt='logo' />

        <Hamburger />
      </div>
    </div>
  )
}
export default Headers;