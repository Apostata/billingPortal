import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: null,
    refreshToken: null,
    message: null,
    redirectPath: "/"
};

const authStart = (state, action) => {
    return {
        ...state,
        loading:true
    }
};

const logout = (state, action) =>{
    if(!action.message){
        action.message = null;
    }
    return{
        ...state,
        loading: initialState.loading,
        token: initialState.token,
        refreshToken: initialState.refreshToken,
        message: action.message
    }
};

const authSuccess = (state, action) => {
    return {
        ...state,
        loading:false,
        token: action.token,
        refreshToken: action.refreshToken
    }
};

const authError = (state, action) => {
    return {
        ...state,
        loading:false,
        message: action.error
    }
};

const redirectPath = (state, action) => {
    return {
        ...state,
        redirectPath: action.redirectPath
    }
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_ERROR:
            return authError(state, action);
        
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        
        case actionTypes.AUTH_REDIRECT:
            return redirectPath(state, action);

        default :
            return state;
    }
}

export default reducer;
