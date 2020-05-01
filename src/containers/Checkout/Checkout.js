import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: null,
        price: 0
    }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    processCheckout = () => {
        this.props.history.replace('/checkout/confirm');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const fetchedingredients = {};
        let Totalprice = 0;
        for (let param of query.entries()) {
            // ['salad', '1']

            if(param[0] === 'price') {
                Totalprice = param[1];
            } else {
                fetchedingredients[param[0]] = +param[1];
            }
            this.setState({ ingredients: fetchedingredients, price: Totalprice})

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
                <Route 
                    path={this.props.match.path + '/confirm'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={+this.state.price} {...props} />)}
                />
            </div>
        )
    }
}

export default Checkout;