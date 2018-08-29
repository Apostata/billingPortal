import React , {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import * as actions from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';

class Customers extends Component{
    
    componentDidMount(){
        this.props.asyncGetCustomers(this.props.token);
    }

    render(){
        let rednderCustomers = (
            <Modal show={true} backdrop={true}>
                <Spinner />
            </Modal>
        );

        if(this.props.customers){
            const tableHead ={
                id: "#",
                name: "Nome",
                document:"Documento",
                status:"Status",
                actions:"Ações"
            };

            const actions = [
                {name: 'Editar', action: this.props.asyncTestCustomers},
                {name: 'Excluir', action: this.props.asyncTestCustomers},
                {name: 'Ativar', action:  this.props.asyncTestCustomers}
                
            ]

            rednderCustomers = (
                <Fragment>
                    <PageTitle>Customers</PageTitle>
                    <Table itens={this.props.customers} head={tableHead} actions={actions} />
                </Fragment>
            );
        }

        return rednderCustomers;
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
        asyncGetCustomers: (token) => dispatch(actions.asyncGetCustomers(token)),
        asyncTestCustomers: (id) => dispatch(actions.asyncTestCustomers(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);