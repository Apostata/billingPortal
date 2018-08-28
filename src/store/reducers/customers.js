import * as actionTypes from '../actions/actionTypes';

const initialState = {
    customers: null
};

const setCustomers = (state, action)=>{
    return {
        ...state,
        customers: action.customers
    }
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.CUSTOMERS_SET:
            return setCustomers(state, action);

        default :
            return state;
    }
}

export default reducer;
