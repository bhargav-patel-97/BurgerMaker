import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // FOR REFERENCE    
    // const test = Object.keys(props.ingredients)
    //         .map(e => {
    //             console.log([...Array(props.ingredients[e])])
    //         });
    let ingredients = Object.keys(props.ingredients);

    if(ingredients) {
        ingredients = Object.keys(props.ingredients)
        .map(igName => {
            return [...Array(props.ingredients[igName])].map((_, i) => {
                return <BurgerIngredient key={igName + i} type={igName} />;
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        }, []);

    }
    
    if (ingredients.length === 0 ) {
        ingredients = <p>Please Start Adding Ingredients to your Burger!</p>
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
