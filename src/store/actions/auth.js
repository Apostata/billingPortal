import * as actionTypes from './actionTypes';

export const asyncGetToken =(opts) =>{
    return{
        type:actionTypes.SAGA_GET_TOKEN,
        opts
    };
};

export const asyncLogout = (message=null) =>{
    return{
        type:actionTypes.SAGA_LOGOUT,
        message
    };
}

export const redirectTo = (path) =>{
    return {
        type: actionTypes.AUTH_REDIRECT,
        redirectPath: path
    };
}

export const redirectLogin = (opts) =>{
    return{
        type: actionTypes.SAGA_REDIRECT,
        opts
    };
}

export const verifyLogged = (name, props) =>{
    return{
        type: actionTypes.SAGA_IS_LOGGED,
        name,
        props
    };
};

export const OAuthStart = () =>{
    return {
        type: actionTypes.AUTH_START
    };
};

export const OAuthSuccess = (token, refreshToken) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken
    };
};

export const OAuthError = (error) =>{
    return {
        type: actionTypes.AUTH_ERROR,
        message: error
    }
};

export const OAuthLogout = () =>{
    return {
       type: actionTypes.AUTH_LOGOUT 
    };
};