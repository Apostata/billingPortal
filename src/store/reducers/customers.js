import * as actionTypes from '../actions/actionTypes';

const initialState = {
    customers: null,
    total: 0,
    offset: 0,
    pageSize: 20,
    loading: false
};

const getCustomers = (state, action)=>{
    return {
        ...state,
        customers: action.customers,
        offset: action.offset,
        pageSize: action.pageSize,
        total: action.total,
        loading: false
    }
}

const customersStart = (state, action)=>{
    return {
        ...state,
        loading:true,
    }
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.CUSTOMERS_GET:
            return getCustomers(state, action);
        
        case actionTypes.CUSTOMERS_START:
            return customersStart(state, action);

        default :
            return state;
    }
}

export default reducer;
