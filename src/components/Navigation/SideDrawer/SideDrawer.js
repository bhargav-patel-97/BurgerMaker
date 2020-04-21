import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';

const sideDrawer = (props) => {
    let classes = [styles.SideDrawer, styles.Close];
    if(props.open) {
        classes = [styles.SideDrawer, styles.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(" ")}>
                <Logo height='11%' margin="32px"/>
                <nav>
                    <NavigationItems />
                </nav>  
            </div>
        </Aux>

    );
};

export default sideDrawer;