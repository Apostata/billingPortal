import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import PropTypes from 'prop-types';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import InputElement from '../../../components/UI/InputElement/InputElement';

class AddEditCustomer extends Component{
    //pegar o customer(input) não customers da api
    // se edit, pegar o id, senão, carregar de um json mesmo os campos

    state={
        id: this.props.match.params.id || null,
        customer: null,
        page: this.props.offset <= 1 ? 0 :  Math.ceil(this.props.offset/20),

        inputs:{
            name:{ value: "value"},
        },
        pageType: null
    }

    componentDidMount(){
        const {location, match, history} = this.props;
        const {id} = this.state;
        this.verifyCustomer(id);

        switch(true){
            case location.pathname.indexOf('/add') !== -1:
            
                this.setState({
                    ...this.state,
                    pageType: "Adicionar"
                });

            break;

            case location.pathname.indexOf('/edit') !== -1:
                if(match.params.id){
                    this.setState({
                        ...this.state,
                        pageType: "Editar",
                    });
                }
                else{
                    history.replace('/customers');
                }
                    
            break;

            default:

                this.setState({
                    ...this.state,
                    pageType: "Detalhes"
                });

            break;
        }
            
    }

    componentDidUpdate(prevProps, prevState){

        const {id} = this.state;
        if(this.props.customers !== prevProps.customers || !this.state.customer){
            this.verifyCustomer(id);
        }
        
    }

    verifyCustomer(id){
        const {customers, token} = this.props;

        if(!customers){
            this.props.asyncGetCustomers(token);
            return;
        }
        else{
            let customer;

            if(!id){
                customer = customers;
            }
            else{
                customer = customers.filter(customer=>{
                    return customer.id === Number(id)
                })
            }
            
            this.setState({
                ...this.state,
                customer: customer[0]
            })
        }
    }

    inputOnChange(e, id){
        const newState = {
            ...this.state,
            inputs:{
                ...this.state.inputs,
                [id]:{
                    ...this.state.inputs[id],
                    value: e.target.value
                }
            }
        };
        this.setState(newState);
    }

    render(){
        const {inputs} = this.state;
        return(
            <article>
                <PageTitle>{this.state.pageType} Customer</PageTitle>
                <form>
                    <div className="personal-data">
                        <h2>Dados Pessoais</h2>
                        <div className="linha">
                            <InputElement
                                id="oples"
                                parent="input-group"
                                label="Teste"
                                value={inputs.name.value}
                                change={this.inputOnChange.bind(this)}
                                name="teste"
                            />
                        </div>
                    </div>
                </form>
            </article>
        )
    }
}

const mapStateToProps = state =>{
    return {
        token: state.auth.token,
        customers: state.customers.customers,
        offset: state.customers.offset
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomers:(token)=>dispatch(actions.asyncGetCustomers(token))
    };
}

AddEditCustomer.propTypes={
    match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.isRequired,
        }),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCustomer);