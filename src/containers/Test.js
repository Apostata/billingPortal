import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Test extends Component{
    componentWillMount(){
        console.log(this.props)
    }
    render(){
       
        let renderAuthenticated = <p>Teste</p>;

        if(!this.props.isAuthenticated){
            renderAuthenticated = <Redirect to="/auth" />;
        }
        
        return renderAuthenticated;
    }
};

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(Test);