import React , {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import * as actions from '../../store/actions'

class Customers extends Component{
    componentWillMount(){
        this.props.asyncGetCustomers(this.props.token);
    }
    
    shouldComponentUpdate(){}

    render(){
        let renderCustomers = ()=>{
            console.log(this.props.customers);

            if(this.props.customers){
                this.props.customers.map(customer=>{
                    return <p>{customer.name}</p>;
                })
            }
        }
        return(
            <Fragment>
                <PageTitle>Customers</PageTitle>
                {renderCustomers()}
            </Fragment>
        );
    }
};

const mapStateToProps = state =>{
    return {
        token: state.auth.token,
        customers: state.customers.customers
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomers: (token) => dispatch(actions.asyncGetCustomers(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);