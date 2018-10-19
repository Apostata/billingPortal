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
                
                this.importCustomerStructure();              
               
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
                if(!customer){
                    this.verifyCustomer(match.params.id);
                }
                else{
                    this.mountInputs(customer);
                }
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

        const fetchCustomer = (customer, parentNode = null) =>{
            Object.keys(customer).forEach( node =>{
                if(node !== "id" && node !== "status"){
                    if(typeof customer[node] === "object" && customer[node]){
                        fetchCustomer(customer[node], node);
                    }
                    else{
                        let idx;

                        if(parentNode){
                            idx = {[parentNode]:node};
                            
                        }
                        else{
                            idx = node;
                        }
                        console.log(idx);

                        let id;
                        parentNode ? id = `${parentNode}.${node}`: id = node;
                        //element, value, classes, id, label, parent, options, change, ...attributes
                        console.log(id);
                        inputs[id] = {};
                        inputs[id].element = 'input';
                        inputs[id].label = fieldNames[node];
                        inputs[id].id = id;
                        inputs[id].name = id;
                        inputs[id].parent= 'input-group';
                        inputs[id].value = customer[node] || "";
                        inputs[id].change = this.inputOnChange.bind(this);
                        inputs[id].focus = this.inputOnFocus.bind(this);
                        inputs[id].blur = this.inputOnBlur.bind(this);
                        inputs[id].selected = false;
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
        //const {setSelectedCustomer} = this.props;
        import('../../../json/createCustomers.json').then(customer=>{
            //setSelectedCustomer(customer);
            this.mountInputs(customer);
        });
    }

    inputOnChange(e, id){
        this.setState({
            ...this.state,
            inputs:{
                ...this.state.inputs,
                [id]:{
                    ...this.state.inputs[id],
                    value: e.target.value
                }
            }
        });
    }

    inputOnFocus(id){
        this.setState({
            ...this.state,
            inputs:{
                ...this.state.inputs,
                [id]:{
                    ...this.state.inputs[id],
                    selected: true
                }
            }
        });
    }

    inputOnBlur(id){
        this.setState({
            ...this.state,
            inputs:{
                ...this.state.inputs,
                [id]:{
                    ...this.state.inputs[id],
                    selected: false
                }
            }
        });
    }

    render(){
        const {inputs} = this.state;
        
        const renderForm = ()=>{
            return Object.keys(inputs).map((input, idx) => {
                if(inputs[input].id !== "name" && inputs[input].id !== "address.street" && inputs[input].id !== "contact.name"){
                    return (
                        <InputElement
                            id={inputs[input].id}
                            key={`${inputs[input].label}-${idx}`}
                            {...inputs[input]}
                            value={inputs[input].value} 
                        />                        
                    );
                }
                else{
                    let title = "";

                    switch(inputs[input].id){
                        case 'name':
                            title = 'Dados Pessoais';
                            break;

                        case 'address.street':
                            title = 'Endereço';
                            break;

                        case 'contact.name':
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
                                id={inputs[input].id}
                                {...inputs[input]}  
                                value={inputs[input].value}
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