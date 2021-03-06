import React from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {

    state = {

        formIsValid: false,
        customerDetails: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'mail',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false
            },contact: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact No.'
                },
                value: '',
                validation: {
                    required: true,
                    length: 10
                },
                valid: false,
                touched: false
            },
            payment: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'online', displayValue: 'Online' },
                        { value: 'offline', displayValue: 'Offline' }
                    ]
            },
                value: 'online',
                validation: {},
                valid: true
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });
        // console.log(this.props.ingredients);
        //this.props.price.toFixed(2)
        const formData = {};
        for (let formValue in this.state.customerDetails) {
            formData[formValue] = this.state.customerDetails[formValue].value;
        }
        
        const order = {
            ingredients : this.props.ings,
            price: this.props.price.toFixed(2),
            customerDetails: formData
        }

        this.props.onOrder(order);

    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.length) {
            isValid = value.length === rules.length && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event,id) => {
        const formRcvData = {
            ...this.state.customerDetails
        };

        const updatedFormElement = {
            ...formRcvData[id]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        formRcvData[id] = updatedFormElement;

        let formIsValid = true;
        for (id in formRcvData) {
            formIsValid = formRcvData[id].valid && formIsValid;
        }
        this.setState({customerDetails: formRcvData, formIsValid: formIsValid});
    }

    render() {

        const formElementArr = [];
        for( let key in this.state.customerDetails ) {
            formElementArr.push({
                id: key,
                config: this.state.customerDetails[key]
            });
        } 
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArr.map(element => (
                    <Input
                        changed={(event) => this.inputChangedHandler(event, element.id)} 
                        key={element.id}
                        elementType={element.config.elementType}
                        touched={element.config.touched}
                        elementConfig={element.config.elementConfig}
                        invalid={!element.config.valid}
                        value={element.config.value}
                    />                    
                ))}
                <Button btnType="SubmitBtn" disabled={!this.state.formIsValid}>Confirm Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return(
            <div className={styles.ContactData}>
                <h4>Please fill out details below</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (order) => dispatch(actions.purchaseBurger(order))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));