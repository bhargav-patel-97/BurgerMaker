import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        cheese: 0,
        onion: 0,
        salad: 0,
        tikki: 0
    },
    totalPrice: 0,
};

const INGREDIENT_PRICES = {
    tikki: 0.5,
    cheese: 0.7,
    onion: 0.5,
    salad: 0.7
};

const reducer = (state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;