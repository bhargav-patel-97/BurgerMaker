import React from 'react';
import styles from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div onClick={props.clicked} className={styles.Backdrop}></div> : null
);

export default backdrop;