import React, { Component } from 'react';
//import styles from './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import Layout from './containers/Layout/Layout';
import Test from './containers/Test';
import Modal from './components/UI/Modal/Modal';
import Spinner from './components/UI/Spinner/Spinner';
import Customers from './containers/Customers/Customers';


class App extends Component {
  
  componentDidMount(){
    //TODO: todas as rotas que não estiverem no menu.json serão enviada para um component 404
    this.props.verifyLogged('billing', this.props);
  }

  componentWillUpdate(nextProps){
    if(nextProps.redirectPath && nextProps.isAuthenticated && this.props.location.search !== ""){
        const queryString = this.props.location.search
        var urlParams = new URLSearchParams(queryString);
        for (let entry of urlParams.entries()){
          if(entry[0] === 'code'){
            this.props.history.replace(nextProps.redirectPath);
          }
      }    
    }
  }

  render() {
    let renderCompoenent = null;

    if(!this.props.isAuthenticated){
      if(this.props.isLoading){
        renderCompoenent = (
          <Layout>
            <Modal show={true} backdrop={true}>
              <Spinner />
            </Modal>
          </Layout>
        )
      }
    }
    else{
        renderCompoenent = (
          <Layout>
            <Switch>
              <Route path="/" exact component={Test} />
              <Route path="/customers" component={Customers} />
              {/* <Route path="/customers/add" component={Customers} /> */}
              <Redirect to="/" />
            </Switch>
          </Layout>
        );
    }

    return renderCompoenent;
  }
};

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.loading,
    redirectPath: state.auth.redirectPath,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    verifyLogged: (name, props) => dispatch(actions.verifyLogged(name, props))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
