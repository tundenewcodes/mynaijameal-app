import React from 'react'
import styles from '../../styles/Modal.module.css'
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick = {props.close} />
}
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}
const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop close = {props.close} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </React.Fragment>
  )
}

export default Modal
