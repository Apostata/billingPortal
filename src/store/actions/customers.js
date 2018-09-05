import * as actionTypes from './actionTypes';
import axios from 'axios';
import json from '../../json/customersRoutes.json';


export const asyncGetCustomers = (token, offset=0) =>{
    return dispatch =>{
        //TODO: passar os parametros de offset
        const config = {
            params:{
                page: offset
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        };
        //const headers = { headers: {Authorization: `Bearer ${token}`}};
        axios.get(json.CUSTOMERS, config).then(response=>{
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
        offset: data.pageable.offset,
        total: data.totalElements,
        pageSize: data.pageable.pageSize
    }
}