import React from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {

    state = {
        name: '',
        email: '',
    }
    componentDidMount() {
        console.log("ContactData Mount");
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        //this.props.price.toFixed(2)
        
        this.setState({ loading: true });
        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: 'Bhargav',
                email: 'bhargavpatel6040@gmail.com'
            },
            payment: 'offline',
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false});
                this.props.history.push('/');
            });

    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Name"></input>
                <input className={styles.Input} type="email" name="email" placeholder="E-mail"></input>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Online</label>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Offline</label>
                <Button btnType="SubmitBtn" clicked={this.orderHandler}>Confirm Order</Button>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData;