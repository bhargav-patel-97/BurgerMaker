import React from 'react';
import styles from './Order.css';

const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={styles.IngredientBox} key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
 
    return(
        <div className={styles.Order}>
            <p>Name: <strong>{props.customerDetails.name}</strong></p><p>Payment: <strong>{props.customerDetails.payment}</strong></p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
};

export default Order;