import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        order: order
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, order));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}