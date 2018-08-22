import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as actions from '../../store/actions';


class Auth extends Component{
    componentDidMount(){

        if(window.location.search !== "" && !this.props.isAuthenticated){
            var urlParams = new URLSearchParams(window.location.search);
            
            for (let entry of urlParams.entries()){
                if(entry[0] === 'code'){
                    this.getToken(entry[1], 'billing');
                }
            }
        }
    }

    getToken(code, name){
        this.props.asyncGetToken({name, code})
    }

    chooseOAuthService(e, name){
        e.preventDefault();
        import(`../../json/${name}`)
        .then(json=>{
            const url = `${json.authorizeUrl}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${json.redirectUri}&response_type=code`;
            if(name === "billing"){
                window.location.href = url;
            }    
        })
    }
    render(){

        let renderAuthenticated = <a onClick={(e) => this.chooseOAuthService(e,'billing')} href="#">Billing</a>;

        if(this.props.isAuthenticated){
            renderAuthenticated = <Redirect to={this.props.redirectTo} />;
        }

        return renderAuthenticated;
    }
};

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        redirectTo: state.auth.redirectPath
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        asyncGetToken: ({name, code}) => {
            dispatch(actions.asyncGetToken({name, code}))
        },
        asyncLogout: () => dispatch(actions.asyncLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);