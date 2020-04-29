import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css'

const CheckoutSummary = (props) => {

    return (
        <div className={styles.CheckoutSummary}>
            <h1>Your delicious burger!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.proceedCheckout} btnType="Success">Confirm</Button>
        </div>
    );
}

export default CheckoutSummary;