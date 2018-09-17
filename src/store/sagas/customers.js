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
                action.pushHistory.push(`/customers/${action.page+1}`);
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
        console.log(error);
        yield put(actions.errorGetCustomer());
    }
};

export function* sagaEditCustomer(action){
    console.log(action);
    yield put(actions.setSelectedCustomer(action.customer));
    yield action.pushHistory.push(`/customers/edit/${action.customer.id}`);
}