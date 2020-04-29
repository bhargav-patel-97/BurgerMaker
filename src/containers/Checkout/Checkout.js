import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: {
            tikki: 0,
            cheese: 0,
            onion: 0,
            salad: 0
        }
    }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    processCheckout = () => {
        this.props.history.replace('/checkout/confirm');
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const fetchedingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            fetchedingredients[param[0]] = +param[1];
            this.setState({ ingredients: fetchedingredients})
        }
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                    proceedCheckout={this.processCheckout}
                    checkoutCancel={this.cancelCheckout}
                    ingredients={this.state.ingredients}
                />
                <Route path={this.props.match.path + '/confirm'} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;