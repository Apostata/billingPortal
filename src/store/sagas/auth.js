import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import json from '../../json/authRoutes.json';

export function* sagaGetToken(action){
    yield put(actions.OAuthStart());
    let data = `redirect_uri=${json.redirectUri}${action.opts.path}&grant_type=authorization_code&code=${action.opts.code}`;
    const url = json.tokenUrl;

    if(action.opts.type === 'refresh_token'){
        data = `grant_type=${action.opts.type}&${action.opts.type}=${action.opts.code}`
    }
    const toBase64 = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`;
    const config ={
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${window.btoa(toBase64)}`
        }
    };
    try{
        const response = yield axios.post(url, data, config);
        
        const tokenExpirationTime = yield response.data.expires_in;
        const tokenExpirationDate = yield new Date(new Date().getTime() + tokenExpirationTime);
        const refreshTokenExpirationDate = yield new Date(new Date().getTime() + 30000000);
        
        yield localStorage.setItem('token', response.data.access_token);
        yield localStorage.setItem('tokenExpDate', tokenExpirationDate);
        yield sessionStorage.setItem('refreshtoken', response.data.refresh_token);
        
        if(action.opts.type !== 'refresh_token'){
            yield sessionStorage.setItem('refreshTokenExpDate', refreshTokenExpirationDate);
        }

        yield put(actions.OAuthSuccess(response.data.access_token, response.data.refresh_token, action.opts.path));
        yield put(actions.redirectTo(action.opts.path));
    }
    catch(error){
        yield put(actions.OAuthError(error.error_description));
        yield put(actions.asyncLogout()); 
    }

};


export function* sagaLogout(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('tokenExpDate');
    yield sessionStorage.removeItem('refreshtoken');
    yield sessionStorage.removeItem('refreshTokenExpDate');
    yield put(actions.OAuthLogout(action.message));
};


export function* sagaRedirectLogin(action){
    const url = `${json.authorizeUrl}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${json.redirectUri}${action.opts.path}&response_type=code`;
    if(action.opts.name === "billing"){
        window.location.href = url;
        //console.log(url)
    }    
};

export function* sagaVerifyLogged(action){

    const token = yield localStorage.getItem('token'); 
    const refreshToken = yield sessionStorage.getItem('refreshtoken');
    const queryString = yield action.props.location.search

    if(!token){ //se não tem token
        yield put(actions.asyncLogout());

        if(!refreshToken){
            if(!queryString){
                console.log('não possui token ou refresh token, nem querystring , logar!');
                yield put(actions.redirectLogin({name:action.name, path: action.props.location.pathname}));
            }
            else{
                var urlParams = new URLSearchParams(queryString);
                for (let entry of urlParams.entries()){
                    if(entry[0] === 'code'){
                        yield put(actions.asyncGetToken({name:'billing', code: entry[1], path: action.props.location.pathname}));
                    }
                }    
            }
        }
    }
    else{ //caso tenho o token no localSorage
        const expiredDate = yield localStorage.getItem('tokenExpDate') || null;

        //token expirado 
        if(new Date(expiredDate).getTime() <= new Date(new Date()).getTime()){
            console.log('token expirado, usar refresh token para pegar um novo');

            if(!refreshToken){
                console.log('possui token mas não refresh token, logar!');
                yield put(actions.asyncLogout());
                yield put(actions.redirectLogin({name:action.name, path: action.props.location.pathname}));
            }
            
            else{
                const refreshExpiredDate = yield sessionStorage.getItem('refreshTokenExpDate') || null;
                console.log(expiredDate, refreshExpiredDate)
                //refreshtoken expirado
                if(new Date(refreshExpiredDate).getTime() <= new Date(new Date()).getTime()){
                    console.log('Refreshtoken expirado');
                    yield put(actions.asyncLogout());
                    yield put(actions.redirectLogin({name:action.name, path: action.props.location.pathname}));
                }
                else{
                    console.log('pegar token usando refreshtoken');
                    yield put(actions.asyncGetToken({name:action.name, code: refreshToken, type:'refresh_token', path: action.props.location.pathname}));
                }
            }
        }
        else{
            console.log('token ainda ativo!');
            yield put(actions.OAuthSuccess(token, refreshToken));
        }
    }
}
