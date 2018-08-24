import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as actions from '../../store/actions';
import styles from './Auth.scss';
import Modal from '../../components/UI/Modal/Modal';

class Auth extends Component{
    state = {
        showModal: true
    }

    componentWillMount(){
        if(this.props.isAuthenticated){
            this.props.history.replace('/');
        }
        else{
            if(window.location.search !== ""){
                var urlParams = new URLSearchParams(window.location.search);
                
                for (let entry of urlParams.entries()){
                    if(entry[0] === 'code'){
                        this.getToken(entry[1], 'billing');
                    }
                }
            }
            else{
                this.chooseOAuthService('billing');
            }
        }
    }

    componentDidMount(){
        console.log('auth component');
        
    }

    toggleModal(){
        this.setState({
            ...this.state,
            showModal: !this.state.showModal
        });
    }

    getToken(code, name){
        this.props.asyncGetToken({name, code})
    }

    //chooseOAuthService(e, name){
    chooseOAuthService(name){
        //e.preventDefault();
        import(`../../json/${name}`)
        .then(json=>{
            const url = `${json.authorizeUrl}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${json.redirectUri}&response_type=code`;
            if(name === "billing"){
                window.location.href = url;
            }    
        })
    }
    render(){

        // let renderAuthenticated = (
        //     <Modal backdrop={true} show={this.state.showModal} clicked={this.toggleModal.bind(this)}>
        //         <a onClick={(e) => this.chooseOAuthService(e,'billing')} >Billing</a>
        //     </Modal>
        // );

        // if(this.props.isAuthenticated){
        //     renderAuthenticated = <Redirect to={this.props.redirectTo} />;
        // }

        // return (
        //     <div className={styles.Auth}>
        //         {renderAuthenticated}
        //     </div>
        // );
        return(null)
    }
};

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        redirectTo: state.auth.redirectPath,
        isLoading: state.auth.loading
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