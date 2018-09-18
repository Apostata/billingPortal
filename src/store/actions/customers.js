import * as actionTypes from './actionTypes';

export const asyncGetCustomers = (token, page=0, pushHistory = null) =>{
    return{
        type: actionTypes.SAGA_FETCH_CUSTOMERS,
        token: token,
        page:page,
        pushHistory: pushHistory
    };
}

export const editCustomer = (customer, pushHistory) =>{
    return{
        type: actionTypes.SAGA_EDIT_CUSTOMER,
        pushHistory,
        customer
    }
}

export const addCustomer = (pushHistory) =>{
    return{
        type: actionTypes.SAGA_ADD_CUSTOMER,
        pushHistory
    }
}

export const setSelectedCustomer = (customer) => {
    return{
        type: actionTypes.CUSTOMER_SET_SELECTED,
        selectedCustomer: customer
    };
};

//TODO criar uma action para cada botão de ação de customers 
export const asyncTestCustomers = (id) =>{
    return dispatch =>{
        console.log('teste'+ id);
    }
}

export const removeCustomers = (id) =>{
    return dispatch =>{
        console.log('teste'+ id);
    }
}

export const activeToggleCustomer = (id, status) =>{
    return dispatch =>{
        console.log('teste'+ id);
    }
}

export const startGetCustomer = ()=>{
    return{
        type: actionTypes.CUSTOMERS_START
    }
}

export const errorGetCustomer = ()=>{
    return{
        type: actionTypes.CUSTOMERS_ERROR
    }
}

export const successGetCustomers = (data)=>{
    return{
        type: actionTypes.CUSTOMERS_FETCH_SUCCESS,
        customers : data.content,
        offset: data.pageable.offset,
        total: data.totalElements,
        pageSize: data.pageable.pageSize
    }
}