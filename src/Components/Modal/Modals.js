import React from 'react';
import {Modal } from 'react-bootstrap';


const Modals = (props) => {

  return(
    <div >
      <Modal
        className='text-center'
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Modals;