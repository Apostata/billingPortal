import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import PropTypes from 'prop-types';

import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import Form from '../../../components/UI/Forms/Forms';
import Utils from '../../../utils/utils';
import fieldNames from '../../../json/fieldNames.json';
import styles from './AddEditCustomer.scss';

class AddEditCustomer extends Component{
   // não passado classes para os inputs

    state={
        pageType: null,
        readyToRender: false
    };

    componentDidMount(){
        const {location, match, history, customer, asyncGetCustomer, token} = this.props;
        const {id} = match.params;
        switch(true){
            case location.pathname.indexOf('/add') !== -1:
                
                this.importCustomerStructure();       
               
                this.setState({
                    ...this.state,
                    readyToRender: false,
                    pageType: "Adicionar"
                });

            break;

            case location.pathname.indexOf('/edit') !== -1:
                if(id){
                    if(!customer){
                        //this.verifyCustomer(match.params.id);
                        asyncGetCustomer(token, id);
                        this.setState({
                            ...this.state,
                            readyToRender: false,
                            pageType: "Editar"
                        });
                    }
                    else{
                        this.setState({
                            ...this.state,
                            pageType: "Editar",
                            readyToRender: true,
                        });
                    }
                }
                else{
                    history.replace('/customers');
                }
            break;

            default:
                if(!customer){
                    asyncGetCustomer(token, id);
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
        const {readyToRender} = this.state;

        if(customer && (readyToRender === false)){
            this.setState({
                ...this.state,
                readyToRender: true,
            })
        }
    }

    importCustomerStructure(){
        import('../../../json/createCustomers.json').then(customer=>{
            this.props.setSelectedCustomer(customer);
        });
    }

    render(){
        const {readyToRender} = this.state;
        let renderPage = null;
        
        if(readyToRender === true){
            let {customer} = this.props;
            let {contact, address} = customer;
            contact = Utils.removePropFromObject(contact, 'id');
            address = Utils.removePropFromObject(address, 'id');
            let {name, document, id, status, ...alteredCust} = customer;
            
            alteredCust = {
                personal:{
                    name: customer.name,
                    document: customer.document
                },
                contact,
                address
            };


            renderPage = (
                <Form 
                    data={alteredCust} 
                    fieldNames={fieldNames} 
                    fieldClasses={styles.inputGroup} 
                    sectionClasses={[styles['addEditArea']].join(' ')}
                >
                </Form>
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