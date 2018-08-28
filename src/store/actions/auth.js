import * as actionTypes from './actionTypes';
import axios from 'axios';

export const asyncGetToken =(opts) =>{
    return dispatch =>{
        import(`../../json/${opts.name}`)
        .then(json=>{
            dispatch(getToken(json, opts));
        })
        .catch(error => {
            this.props.asyncLogout();
        });
    }
};

const getToken = (json, opts) =>{
    return dispatch =>{
        
        dispatch(OAuthStart());
        let data = `redirect_uri=${json.redirectUri}${opts.path}&grant_type=authorization_code&code=${opts.code}`;
        const url = json.tokenUrl;

        if(opts.type === 'refresh_token'){
            data = `grant_type=${opts.type}&${opts.type}=${opts.code}`
        }
        const toBase64 = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`;
        const config ={
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${window.btoa(toBase64)}`
            }
        };

        axios.post(url, data, config)
        .then(response=>{
            const tokenExpirationTime = response.data.expires_in;
            const tokenExpirationDate = new Date(new Date().getTime() + tokenExpirationTime);
            
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('tokenExpDate', tokenExpirationDate);
            sessionStorage.setItem('refreshtoken', response.data.refresh_token);
            dispatch(OAuthSuccess(response.data.access_token, response.data.refresh_token, opts.path));
            dispatch(redirectTo(opts.path));
        }).catch(error=>{
            dispatch(OAuthError(error));
        });     
    }
}

export const asyncLogout = (message=null) =>{
    return dispatch =>{
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpDate');
        sessionStorage.removeItem('refreshtoken');
        dispatch(OAuthLogout(message));
    }
}

export const redirectTo = (path) =>{
    return {
        type: actionTypes.AUTH_REDIRECT,
        redirectPath: path
    }
}

const redirectLogin = (opts) =>{
    return dispatch =>{
        import(`../../json/${opts.name}`).then(json=>{
            const url = `${json.authorizeUrl}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${json.redirectUri}${opts.path}&response_type=code`;
            if(opts.name === "billing"){
                window.location.href = url;
                //console.log(url)
            }    
        })
    }
}

export const verifyLogged = (name, props) =>{
    return dispatch =>{

        const token = localStorage.getItem('token'); 
        const refreshToken = sessionStorage.getItem('refreshtoken');
        const queryString = props.location.search

        if(!token){
            dispatch(asyncLogout());

            if(!refreshToken){
                if(!queryString){
                    console.log('não possui token ou refresh token, logar!');
                    
                    dispatch(redirectLogin({name, path: props.location.pathname}));
                }
                else{
                    console.log(queryString);
                    var urlParams = new URLSearchParams(queryString);
                    for (let entry of urlParams.entries()){
                        if(entry[0] === 'code'){
                            dispatch(asyncGetToken({name:'billing', code: entry[1], path: props.location.pathname}));
                        }
                    }    
                }
            }
        }
        else{
            const expiredDate = localStorage.getItem('tokenExpDate');
            

            if(new Date(expiredDate).getTime() <= new Date(new Date()).getTime()){
                console.log('token expirado, usar refresh token para pegar um novo');
                
                if(!refreshToken){
                    console.log('possui token mas não refresh token, logar!');
                    dispatch(asyncLogout('Você foi deslogado! Logue novamente!'));
                    dispatch(redirectLogin({name, path: props.location.pathname}));
                }
                else{
                    console.log('getting Refresh token');
                    dispatch(asyncGetToken({name, code: refreshToken, type:'refresh_token', path: props.location.pathname}))
                }
            }
            else{
                console.log('token ainda ativo, recalcular tempo de expiração');
                dispatch(OAuthSuccess(token, refreshToken));
            }
        }
    }   
};

const OAuthStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};

const OAuthSuccess = (token, refreshToken) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken
    }
};

const OAuthError = (error) =>{
    return {
        type: actionTypes.AUTH_ERROR,
        message: error
    }
};

const OAuthLogout = () =>{
    return {
       type: actionTypes.AUTH_LOGOUT 
    }
}


// const expiresToken = (time, date) => {
//     return dispatch =>{
//         setTimeout(()=>{
//             //TODO verify logged
//         }, time)
//     }
// };
