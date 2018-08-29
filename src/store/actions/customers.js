import * as actionTypes from './actionTypes';
import axios from 'axios';
import json from '../../json/customersRoutes.json';


export const asyncGetCustomers = (token) =>{
    return dispatch =>{
        const headers = { headers: { Authorization: `Bearer ${token}` }};
        axios.get(json.CUSTOMERS, headers).then(response=>{
           dispatch(setCustomers(response.data.content));
        })
        .catch(error=>{
            console.log(error);
            dispatch(setCustomers(null));
        })
    }
}

export const asyncTestCustomers = (id) =>{
    return dispatch =>{
        console.log('teste'+ id);
    }
}

// const customerStart = () =>{
//     return{
//         type: actionTypes.CUSTOMERS_START
//     }
// }

const setCustomers = (customers)=>{
    return{
        type: actionTypes.CUSTOMERS_SET,
        customers 
    }
}