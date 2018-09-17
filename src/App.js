import React, { Component } from 'react';
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

  componentDidUpdate(prevProps){
    if(this.props.redirectPath && this.props.isAuthenticated && prevProps.location.search !== ""){
        const queryString = prevProps.location.search
        var urlParams = new URLSearchParams(queryString);
        for (let entry of urlParams.entries()){
          if(entry[0] === 'code'){
            prevProps.history.replace(this.props.redirectPath);
          }
      }    
    }

    //para verificar caso 
    if(prevProps.isAuthenticated && !this.props.isAuthenticated){
      this.props.verifyLogged('billing', this.props);
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
              <Route path="/customers/edit/:id" component={Test} />
              <Route path="/customers/add" component={Test} />
              <Route path="/customers/:page" component={Customers} />
              <Route path="/customers" component={Customers} />
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
