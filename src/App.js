import React, { Component } from 'react';
//import styles from './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import Auth from './containers/Auth/Auth';
import Test from './containers/Test';


class App extends Component {
  componentWillMount(){
    const path = this.props.location.pathname;
    this.props.verifyLogged('billing');
    if(path !== "/auth" && path !=='/'){
      this.props.redirectAfterLogged(path);
    }
  }

  render() {

    let renderAuthenticated =(
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>);

    if(!this.props.isAuthenticated){
      renderAuthenticated =( 
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>);
    }
    return renderAuthenticated;
  }
};

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    verifyLogged: (name) => dispatch(actions.verifyLogged(name)),
    redirectAfterLogged: (path) =>dispatch(actions.redirectAfterLogged(path))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
