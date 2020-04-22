import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component{

    //For debugging purposes// To improve overall webapp performance
    componentDidUpdate() {
        console.log('[OrderSummary] DidUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}:</span> {this.props.ingredients[key]}
                </li>
        );
        });

        return(
            <Aux>
                <h3>Your Order Summary</h3>
                <p>A Delicious Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Your Total: <b>{this.props.price.toFixed(2)}$</b></p>
                <p>Continue to Checkout >></p>
                <Button btnType="Danger" clicked={this.props.orderCancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.orderContinue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;