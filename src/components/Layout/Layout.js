import React from 'react';
import Aux from '../../hoc/Auxilary';
import styles from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    
    state= {
        showSideDrawer: false
    }

    sideDrawerClose = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {   
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar drawerToggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer closed={this.sideDrawerClose} open={this.state.showSideDrawer}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;