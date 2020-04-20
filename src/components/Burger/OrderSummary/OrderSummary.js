import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}:</span> {props.ingredients[key]}
                </li>
        );
        });

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A Delicious Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout >></p>
            <Button btnType="Danger" clicked={props.orderCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.orderContinue}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;