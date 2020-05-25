import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
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
        return(
            <div>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);