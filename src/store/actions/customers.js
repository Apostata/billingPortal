import * as actionTypes from './actionTypes';

export const asyncGetCustomers = (token, page=0, pushHistory = null) =>{
    return{
        type: actionTypes.SAGA_FETCH_CUSTOMERS,
        token: token,
        page:page,
        pushHistory: pushHistory
    };
}

export const asyncGetCustomer = (token, id) =>{
    return{
        type: actionTypes.SAGA_GET_CUSTOMER,
        token: token,
        id:id
    };
}

export const navigateToEditCustomer = (id, pushHistory) =>{
    return{
        type: actionTypes.SAGA_EDIT_CUSTOMER,
        pushHistory,
        id
    }
}

export const editCustomer = (customer) =>{
    return{
        type: actionTypes.CUSTOMER_EDIT,
        customer
    }
};

export const navigateToAddCustomer = (pushHistory) =>{
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
export const toggleActivateCustomer = (token, id, status, page, customers) =>{
    return{
        type: actionTypes.SAGA_ACTIVE_TOGGLE_CUSTOMER,
        token: token,
        id: id,
        status: status,
        page: page,
        customers: customers
    };
}

export const removeCustomers = (id) =>{
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