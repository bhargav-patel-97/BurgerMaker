import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
    state = {
        ingredients: {
            tikki: 1,
            cheese: 1,
            onion: 1,
            salad: 1
        }
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;