import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends React.Component {

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    processCheckout = () => {
        this.props.history.replace('/checkout/confirm');
    }

    render() {
        let checkoutSummary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        proceedCheckout={this.processCheckout}
                        checkoutCancel={this.cancelCheckout}
                        ingredients={this.props.ings}
                    />
                    <Route 
                    path={this.props.match.path + '/confirm'}
                    component={ContactData}
                    />
                </div>
            );
        }
        return checkoutSummary; 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);