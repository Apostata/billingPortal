import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import json from '../../json/customersRoutes.json';

export function* sagaGetCustomers(action){
    const config = yield {
        params:{
            page: action.page
        },
        headers:{
            Authorization: `Bearer ${action.token}`
        }
        
    };

    yield put(actions.startGetCustomer());

    try{
        const response = yield axios.get(json.CUSTOMERS, config);
        
        if(response.data.content){
            yield put(actions.successGetCustomers(response.data));

            if(action.pushHistory){
                yield action.pushHistory.push(`/customers/${action.page+1}`);
            }
        }
        else{
            //recursividade para retornar até uma página que tenha resultados
            yield put(actions.errorGetCustomer())
            yield action.page--;
            yield sagaGetCustomers(action);
        }
    }
    catch(error){
        yield console.log(error);
        yield put(actions.errorGetCustomer());
    }
};

export function* sagaNavigateToEditCustomer(action){
    yield action.pushHistory.push(`/customers/edit/${action.id}`);
};

export function* sagaNavigateToAddCustomer(action){
    yield action.pushHistory.push("/customers/add");
};

export function* sagaToggleActivateCustomer(action){
    const config = yield {
        headers:{
            Authorization: `Bearer ${action.token}`
        }
        
    };

    const activeOrNot = yield action.status === "ACTIVE" ? 'inactive':'active';
    
    try{
        const response = yield axios.put(`${json.CUSTOMERS}/${action.id}/${activeOrNot}`, null, config);
        yield put(actions.editCustomer(response.data, action.customers));
    }
    catch(error){
        yield console.log(error);
    }
};

export function* sagaEditCustomers(customer, customers){

}