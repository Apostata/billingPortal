import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import PropTypes from 'prop-types';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import InputElement from '../../../components/UI/InputElement/InputElement';
import fieldNames from '../../../json/fieldNames.json';
import styles from './AddEditCustomer.scss';

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
            let parentIndex = 1;
           
            Object.keys(customer).forEach( node =>{
               
                if(node !== "id" && node !== "status"){
                    if(typeof customer[node] === "object" && customer[node]){
                        fetchCustomer(customer[node], {name:node, length:Object.keys(customer[node]).length});
                    }
                    else{
                        let id;
                        parentNode ? id = `${parentNode.name}_${node}`: id = node;
                        //element, value, classes, id, label, parent, options, change, ...attributes
                        inputs[id] = {};
                        inputs[id].element = 'input';
                        inputs[id].label = fieldNames[node];
                        inputs[id].id = id;
                        inputs[id].name = id;
                        inputs[id].parentClasses = styles.inputGroup;
                        inputs[id].parent= `inputGroup`;
                        inputs[id].value = customer[node] || "";
                        inputs[id].change = this.inputOnChange.bind(this);
                        inputs[id].focus = this.inputOnFocus.bind(this);
                        inputs[id].blur = this.inputOnBlur.bind(this);
                        inputs[id].selected = false;
                    }
                }
                if(parentNode){
                    if(parentIndex > parentNode.legth) parentNode = null;
                }
                parentIndex ++;
            });

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
        import('../../../json/createCustomers.json').then(customer=>{
            //this.mountInputs(customer);
            this.props.setSelectedCustomer(customer);
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
        let renderPage = null;
        if(this.props.customer && this.state.inputs){
            const {inputs} = this.state;
            let {customer} = this.props;
            let {name, document, id, status, ...alteredCust} = customer;
            alteredCust = {
                personal:{
                    name: customer.name,
                    document: customer.document
                },
                ...alteredCust
            }
            

            const recursiveFetchField = (customer, parentNode = null)=>{
                return Object.keys(customer).map((field, idx)=>{
                   
                    if(field !== "id" && field !== 'status'){
                        
                        if(customer[field] && typeof customer[field] === "object"){
                           
                            return (
                                <div key={`${field}-${idx}`} className={[styles[`${field}Area`], styles['addEditArea']].join(' ')}>
                                    <h3>{fieldNames.titles[field]}</h3>
                                    {recursiveFetchField(customer[field], field)}
                                </div>
                            );
                        }

                        else{
                            let input;
                            if(parentNode && parentNode !=='personal'){
                                input = `${parentNode}_${field}`;
                            }
                            else{
                                input = field;
                            }
                            
                            return returInput(input, idx);
                        }
                    }
                    else{
                      return null;
                    }
                    
                });
            };

            const returInput = (input, idx)=>{
                return(
                    <InputElement
                        
                        id={inputs[input].id}
                        key={`${inputs[input].label}-${idx}`}
                        {...inputs[input]}
                        value={inputs[input].value} 
                    /> 
                );
            }
            
            const renderForm = (customer)=>{
                return recursiveFetchField(customer);     
            };

            renderPage = (
                <form>
                   {inputs ? renderForm(alteredCust, 'personal') :null}
                </form>
            );
        }

        return(
            <article className={styles.AddEditCustomer}>
                <PageTitle>{this.state.pageType} Customer</PageTitle>
                {renderPage}
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