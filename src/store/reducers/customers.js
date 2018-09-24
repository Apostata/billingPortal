import * as actionTypes from '../actions/actionTypes';

const initialState = {
    customers: null,
    total: 0,
    offset: 0,
    pageSize: 20,
    loading: false,
    selectedCustomer: null
};

const fetchCustomers = (state, action)=>{
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
};

const selectCustomer = (state, action)=>{
    return{
        ...state,
        selectedCustomer: action.selectedCustomer
    }
}

const customerEdit = (state, action)=>{
    const newCustomers = state.customers.map(customer=>{
        if(customer.id === action.customer.id){
            return action.customer;
        }
        return customer;
    });
    
    return {
        ...state,
        customers:newCustomers
    }
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.CUSTOMERS_FETCH_SUCCESS:
            return fetchCustomers(state, action);
        
        case actionTypes.CUSTOMERS_START:
            return customersStart(state, action);

        case actionTypes.CUSTOMER_SET_SELECTED:
            return selectCustomer(state, action);

        case actionTypes.CUSTOMER_EDIT:
            return customerEdit(state, action);

        default :
            return state;
    }
}

export default reducer;
