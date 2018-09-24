import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import PropTypes from 'prop-types';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import InputElement from '../../../components/UI/InputElement/InputElement';
import fieldNames from '../../../json/fieldNames.json';

class AddEditCustomer extends Component{
   // não passado classes para os inputs

    state={
        inputs: null,
        pageType: null
    };

    componentDidMount(){
        const {location, match, history, customer} = this.props;

        switch(true){
            case location.pathname.indexOf('/add') !== -1:
                if(!customer){
                    this.importCustomerStructure();
                }
                else{
                    this.mountInputs(customer);
                }
               
                this.setState({
                    ...this.state,
                    pageType: "Adicionar"
                });

            break;

            case location.pathname.indexOf('/edit') !== -1:
                if(match.params.id){
                    
                    if(!customer){
                        this.verifyCustomer(match.params.id);
                    }
                    else{
                        this.mountInputs(customer);
                    }
                    
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
        const {customer} = this.props;
        const {inputs} = this.state;
        
        if((customer && prevProps.customer !== customer) || (!inputs && customer)){
            this.mountInputs(customer);
        }
    }

    mountInputs(customer){
        let inputs ={};

        const fetchCustomer = (customer) =>{
            Object.keys(customer).forEach( node =>{
                if(node !== "id" && node !== "status"){
                    if(typeof customer[node] === "object" && customer[node]){
                        fetchCustomer(customer[node])
                    }
                    else{
                        //element, value, classes, id, label, parent, options, change, ...attributes
                        inputs[node] = {};
                        inputs[node].element = 'input';
                        inputs[node].label = fieldNames[node];
                        inputs[node].parent= 'input-group'
                        inputs[node].change = this.inputOnChange.bind(this);
                        if(this.state.pageType === 'Editar'){
                            inputs[node].value = customer[node];
                            inputs[node].classes = 'active teste'
                        }
                    }
                }
            })
        };

        fetchCustomer(customer);
        
        this.setState({
            ...this.state,
            inputs
        });
        
    }

    verifyCustomer(id){
        const {customer, token, asyncGetCustomer} = this.props;

        if(!customer){
            asyncGetCustomer(token, id);
            return;
        }
    }

    importCustomerStructure(){
        const {setSelectedCustomer} = this.props;
        import('../../../json/createCustomers.json').then(customer=>{
            setSelectedCustomer(customer);
        });
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
        const {inputs, pageType} = this.state;
        
        const renderForm = ()=>{
            return Object.keys(inputs).map((input, idx) => {
                if(inputs[input].label !== "Nome" && inputs[input].label !== "Logradouro" && inputs[input].label !== "Título"){
                    console.log(inputs[input].label);
                    return (
                        <InputElement
                            id={inputs[input].label}
                            key={`${inputs[input].label}-${idx}`}
                            {...inputs[input]}
                            value={pageType === 'Editar'?inputs[input].value:null} 
                        />                        
                    );
                }
                else{
                    console.log(inputs[input].label);
                    let title = "";

                    switch(inputs[input].label){
                        case 'Nome':
                            title = 'Dados Pessoais';
                            break;

                        case 'Logradouro':
                            title = 'Endereço';
                            break;

                        case 'Título':
                            title = 'Dados para Contato';
                            break;

                        default:
                            title= null;
                            break;
                    }

                    return (
                        <Fragment key={`${inputs[input].label}-${idx}`}>
                            <h3>{title}</h3>
                            <InputElement
                                id={inputs[input].label}
                                {...inputs[input]}  
                                value={pageType === 'Editar'?inputs[input].value:null}
                            />                      
                        </Fragment>  
                    );
                }
            })
            
        }
        return (
            <article>
                <PageTitle>{this.state.pageType} Customer</PageTitle>
                <form>
                   {inputs?renderForm():null}
                </form>
            </article>
        );
    }
}

const mapStateToProps = state =>{
    return {
        token: state.auth.token,
        customer: state.customers.selectedCustomer,
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomer:(token, id) => dispatch(actions.asyncGetCustomer(token, id)),
        setSelectedCustomer:(customer) => dispatch(actions.setSelectedCustomer(customer))
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