import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type:'salad' },
    { label: 'Bacon', type:'bacon' },
    { label: 'Cheese', type:'cheese' },
    { label: 'Meat', type:'meat' },
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
            disabled={!props.orderState}>Order Now</button>
    </div>
);

export default buildControls;