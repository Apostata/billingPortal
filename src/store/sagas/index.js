import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'; 
import {sagaGetCustomers, sagaEditCustomer, sagaAddCustomer} from './customers';
import {sagaGetToken, sagaLogout, sagaRedirectLogin, sagaVerifyLogged} from './auth';

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.SAGA_GET_TOKEN, sagaGetToken),
        takeEvery(actionTypes.SAGA_LOGOUT, sagaLogout),
        takeEvery(actionTypes.SAGA_REDIRECT, sagaRedirectLogin),
        takeEvery(actionTypes.SAGA_IS_LOGGED, sagaVerifyLogged)
    ])
};

export function* watchCustomers(){
    yield all([
        takeLatest(actionTypes.SAGA_FETCH_CUSTOMERS, sagaGetCustomers),
        takeEvery(actionTypes.SAGA_EDIT_CUSTOMER, sagaEditCustomer),
        takeLatest(actionTypes.SAGA_ADD_CUSTOMER, sagaAddCustomer)
    ])
};

