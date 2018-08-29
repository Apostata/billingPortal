import * as actionTypes from './actionTypes';
import axios from 'axios';
import json from '../../json/customersRoutes.json';


export const asyncGetCustomers = (token) =>{
    return dispatch =>{
        //TODO: passar os parametros de offset
        const headers = { headers: { Authorization: `Bearer ${token}` }};
        axios.get(json.CUSTOMERS, headers).then(response=>{
            console.log(response.data);
           dispatch(getCustomers(response.data));
        })
        .catch(error=>{
            console.log(error);
            dispatch(getCustomers(null));
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

const getCustomers = (data)=>{
    return{
        type: actionTypes.CUSTOMERS_GET,
        customers : data.content,
        total: data.totalElements,
        offset: data.pageable.offset,
        pageSize: data.pageable.pageSize
    }
}