//login actions
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS'; 
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REDIRECT = 'AUTH_REDIRECT';
    //saga
    export const SAGA_GET_TOKEN = 'SAGA_GET_TOKEN';
    export const SAGA_LOGOUT = 'SAGA_LOGOUT';
    export const SAGA_REDIRECT = 'SAGA_REDIRECT';
    export const SAGA_IS_LOGGED = 'SAGA_IS_LOGGED';


//customers actions
export const CUSTOMERS_START = 'CUSTOMERS_START';
export const CUSTOMERS_FETCH_SUCCESS = 'CUSTOMERS_FETCH_SUCCESS';
export const CUSTOMER_GET = 'CUSTOMER_GET';
export const CUSTOMERS_ERROR = 'CUSTOMERS_ERROR';
export const CUSTOMER_SET_SELECTED = 'CUSTOMER_SET_SELECTED';
export const CUSTOMERS_EDIT = 'CUSTOMERS_EDIT';
    //saga
    export const SAGA_FETCH_CUSTOMERS = 'SAGA_FETCH_CUSTOMERS';
    export const SAGA_GET_CUSTOMER = 'SAGA_GET_CUSTOMER';
    export const SAGA_ADD_CUSTOMER = 'SAGA_ADD_CUSTOMER';
    export const SAGA_EDIT_CUSTOMER = 'SAGA_EDIT_CUSTOMER';
    export const SAGA_EDIT_CUSTOMERS = 'SAGA_EDIT_CUSTOMERS';
    export const SAGA_REMOVE_CUSTOMER = 'SAGA_FETCH_CUSTOMERS';
    export const SAGA_ACTIVE_TOGGLE_CUSTOMER = 'SAGA_ACTIVE_TOGGLE_CUSTOMER';