import React, { useState } from 'react';
import cx from 'classname';
import styles from './Header.module.css';


const Hamburger = () =>{
  const [open, setOpen] = useState(false)
  return(
    <>
      <div open={open} className={open ? cx(styles.hamburger, styles.open) : styles.hamburger} 
        onClick={() =>setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </div> 
      <ul className={open ? cx(styles.lists): cx(styles.lists, styles.hide)} >
        <li><a href='/'>Home</a></li>
        <li><a href='/login'>Login</a></li>
        <li><a href='/register'>Register</a></li>
      </ul>
    </>
  )
}
export default Hamburger;