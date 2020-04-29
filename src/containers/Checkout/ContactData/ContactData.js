import React from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';

class ContactData extends React.Component {

    state = {
        name: '',
        email: '',
    }
    componentDidMount() {
        console.log("ContactData Mount");
    }

    render() {
        return(
            <div className={styles.ContactData}>
                <h4>Please fill out details below</h4>
                <form>
                    <input className={styles.Input} type="text" name="name" placeholder="Name"></input>
                    <input className={styles.Input} type="email" name="email" placeholder="E-mail"></input>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label for="male">Online</label>
                    <input type="radio" id="female" name="gender" value="female" />
                    <label for="female">Offline</label>
                </form>
                <Button btnType="Success">Confirm Order</Button>
            </div>
        );
    }
}

export default ContactData;