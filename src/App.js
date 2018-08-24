import React, { Component } from 'react';
//import styles from './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Test from './containers/Test';
import Modal from './components/UI/Modal/Modal';
import Spinner from './components/UI/Spinner/Spinner';


class App extends Component {

  componentWillMount(){  
    this.props.verifyLogged('billing');
    
    const path = this.props.location.pathname;
    if(path !== "/auth" && path !=='/'){
      this.props.redirectAfterLogged(path);
    }
  }


  render() {
    let renderAuthenticated = (
      <Modal show={true} backdrop={true}>
        <Spinner />
      </Modal>
      );
    
    if(this.props.isAuthenticated){
      renderAuthenticated =(
        <Switch>
          <Route path="/" exact component={Test} />
          <Redirect to="/" />
        </Switch>
      )
    }
    else{
      if(!this.props.isLoading){
        renderAuthenticated =(
            <Switch>
              <Route path="/auth" component={Auth} />
              <Redirect to="/auth" />
            </Switch>
          );
      }
    }

      return (
        <Layout>
          {renderAuthenticated}
        </Layout>
      )
  }
};

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    verifyLogged: (name) => dispatch(actions.verifyLogged(name)),
    redirectAfterLogged: (path) =>dispatch(actions.redirectAfterLogged(path))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
