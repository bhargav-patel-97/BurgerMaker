import React from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {

    state = {
        checkout: false,
        loading: false
    }

    componentDidMount() {
        //  Original call to firebase for fetching ingredients
        // axios.get('https://burgermaker-84f27.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //         // return response;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    updateOrderState = (ings) => {

        const sum = Object.keys(ings)
            .map(key => {
                return ings[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        // console.log(sum);
        return sum > 0;
    }

    orderSummary = () => {
        this.setState({ checkout: true });
    }

    orderCancelHandler = () => {
        this.setState({ checkout: false });
    }

    orderContinueHandler = () => {
        //alert('Be concious while ordering! No one\'s ever getting a burger from here!');
        // this.setState({ loading: true });

        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burgerApp = <Spinner />

        if (this.props.ings) {
            burgerApp =  (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded} 
                        removeIngredient= {this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        orderState={this.updateOrderState(this.props.ings)}
                        orderSummary={this.orderSummary}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                orderCancel={this.orderCancelHandler}
                orderContinue={this.orderContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }


        return(
            <Aux>
                <Modal show={this.state.checkout} modalClosed={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerApp}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
} 

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));