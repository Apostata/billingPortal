import * as actionTypes from '../actions/actionTypes';

const initialState = {
    customers: null,
    loading: false
};

const setCustomers = (state, action)=>{
    return {
        ...state,
        customers: action.customers,
        loading: false
    }
}

const customersStart = (state, action)=>{
    return {
        ...state,
        loading: true
    }
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.CUSTOMERS_SET:
            return setCustomers(state, action);
        
        case actionTypes.CUSTOMERS_START:
            return customersStart(state, action);

        default :
            return state;
    }
}

export default reducer;
