import React from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleHandler} />
        <Logo height='80%' />
        <nav className={styles.DesktopOnly}>
           <NavigationItems />
        </nav>
    </header>
);

export default toolbar;