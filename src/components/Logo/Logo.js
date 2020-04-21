import React from 'react';
import BurgerMakerLogo from '../../assets/images/burger.png';
import styles from './Logo.css'

const logo = (props) => (
    <div className={styles.Logo} style={{height: props.height, marginBottom: props.margin}}>
        <img src={BurgerMakerLogo} alt="BurgerMaker Logo"/>
    </div>
);

export default logo;