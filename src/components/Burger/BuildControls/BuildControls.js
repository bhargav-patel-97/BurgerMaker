import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Tikki', type:'tikki' },
    { label: 'Cheese', type:'cheese' },
    { label: 'Onion', type:'onion' },
    { label: 'Salad', type:'salad' },
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                add={() => props.addIngredient(control.type)}
                remove={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button 
            className={styles.OrderButton}
            disabled={!props.orderState}
            onClick={props.orderSummary}>Order Now</button>
    </div>
);

export default buildControls;