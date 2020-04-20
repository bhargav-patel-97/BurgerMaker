import React from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.2,
    bacon: 0.7
};

class BurgerBuilder extends React.Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 3,
        orderState: false,
        checkout: false
    }

    updateOrderState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        // console.log(sum);
        this.setState({orderState: sum > 0});
    }

    addIngredient = (type) => {
        let oldCount = this.state.ingredients[type];
        const newCount = ++oldCount;
        const newIngredients = {
            ...this.state.ingredients
        };

        newIngredients[type] = newCount;
        const addPrice = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addPrice;
        this.setState({totalPrice: newPrice, ingredients: newIngredients});
        this.updateOrderState(newIngredients);
    }

    removeIngredient = (type) => {
        let oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const newCount = --oldCount;
        const newIngredients = {
            ...this.state.ingredients
        };

        newIngredients[type] = newCount;
        const reducePrice = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - reducePrice;
        this.setState({totalPrice: newPrice, ingredients: newIngredients});
        this.updateOrderState(newIngredients);
    }

    orderSummary = () => {
        this.setState({ checkout: true });
    }

    orderCancelHandler = () => {
        this.setState({ checkout: false });
    }

    orderContinueHandler = () => {
        alert('Continue with eating!');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal  show={this.state.checkout} modalClosed={this.orderCancelHandler}>
                    <OrderSummary 
                    orderCancel={this.orderCancelHandler}
                    orderContinue={this.orderContinueHandler}
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                addIngredient={this.addIngredient} 
                removeIngredient= {this.removeIngredient}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                orderState={this.state.orderState}
                orderSummary={this.orderSummary}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;