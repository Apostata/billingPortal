import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'; 
import {
    sagaGetToken,
    sagaLogout,
    sagaRedirectLogin,
    sagaVerifyLogged
} from './auth';

import {
    sagaGetCustomers,
    sagaNavigateToEditCustomer,
    sagaNavigateToAddCustomer,
    sagaToggleActivateCustomer
} from './customers';

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.SAGA_GET_TOKEN, sagaGetToken),
        takeEvery(actionTypes.SAGA_LOGOUT, sagaLogout),
        takeEvery(actionTypes.SAGA_REDIRECT, sagaRedirectLogin),
        takeEvery(actionTypes.SAGA_IS_LOGGED, sagaVerifyLogged)
    ]);
};

export function* watchCustomers(){
    yield all([
        takeEvery(actionTypes.SAGA_FETCH_CUSTOMERS, sagaGetCustomers),
        takeLatest(actionTypes.SAGA_EDIT_CUSTOMER, sagaNavigateToEditCustomer),
        takeLatest(actionTypes.SAGA_ADD_CUSTOMER, sagaNavigateToAddCustomer),
        takeLatest(actionTypes.SAGA_ACTIVE_TOGGLE_CUSTOMER, sagaToggleActivateCustomer)
    ]);
};

