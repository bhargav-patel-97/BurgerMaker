import React from 'react';
import styles from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];

    if(props.invalid && props.touched) {
        inputStyles.push(styles.Invalid);
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed} 
                className={inputStyles.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
            />;
            break;
        case('select'):
            inputElement = <select
                onChange={props.changed} 
                className={inputStyles.join(' ')} 
                {...props} 
                value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input 
                onChange={props.changed} 
                className={inputStyles.join(' ')} 
                {...props} 
                value={props.value}
            />;
    }

    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;