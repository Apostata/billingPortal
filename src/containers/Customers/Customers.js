import React, {Component} from 'react';
import { connect } from 'react-redux';

class Customers extends Component{
    componentDidMount(){
        
    }
    render(){
       
        let renderAuthenticated = <p>Customers</p>;
        return renderAuthenticated;
    }
};

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirect
    };
};

export default connect(mapStateToProps, null)(Customers);