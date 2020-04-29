import React from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    tikki: 0.5,
    cheese: 0.7,
    onion: 0.5,
    salad: 0.7
};

class BurgerBuilder extends React.Component {

    state = {
        ingredients: null,
        totalPrice: 3,
        orderState: false,
        checkout: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://burgermaker-84f27.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                // return response;
            })
            .catch(error => {
                console.log(error);
            });
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
        // let burgerDiv = document.querySelector(".Burger__Burger__\\\\");
        // let buildControlDiv = document.querySelector(".BuildControls__BuildControls__\\\\");
        // console.log(burgerDiv, buildControlDiv);
        // burgerDiv.classList.add(styles.Blur);
        // buildControlDiv.classList.add(styles.Blur);
    }

    orderCancelHandler = () => {
        this.setState({ checkout: false });
    }

    orderContinueHandler = () => {
        //alert('Be concious while ordering! No one\'s ever getting a burger from here!');
        this.setState({ loading: true });

        // const order = {
        //     ingredients : this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'Bhargav',
        //         email: 'bhargavpatel6040@gmail.com'
        //     },
        //     payment: 'offline'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         // console.log(response)
        //         this.setState({ loading: false, checkout: false });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ loading: false, checkout: false });
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burgerApp = <Spinner />

        if (this.state.ingredients) {
            burgerApp =  (
                <Aux>
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

            orderSummary = <OrderSummary 
                orderCancel={this.orderCancelHandler}
                orderContinue={this.orderContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);