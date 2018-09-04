import React , {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import * as actions from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import Pagination from '../../components/Pagination/Pagination';

class Customers extends Component{

    componentDidMount(){
        this.props.asyncGetCustomers(this.props.token);
    }

    render(){
        let pagination = null;
        let {total, offset, pageSize} = this.props;

        if(total > offset){
           if(offset === 0) offset = 1;

            const pages = new Array(Math.ceil(total/(pageSize * offset))).fill(undefined); //precisa ter algo no array

            pagination = (
                <div className="pagination">
                    <Pagination pages={pages}/>
                </div>
            )
        }


        let rednderCustomers = (
            <Modal show={true} backdrop={true}>
                <Spinner />
            </Modal>
        );

        if(this.props.customers){
            const tableColumns ={
                id: "#",
                name: "Nome",
                document:"Documento",
                status:"Status",
                actions:"Ações"
            };

            const actions = [
                {name: 'Editar', classes:'edit', action: this.props.asyncTestCustomers},
                {name: 'Excluir', classes:'delete', action: this.props.asyncTestCustomers},
                {name: 'Ativar', classes:'activate', action:  this.props.asyncTestCustomers}
                
            ]

            rednderCustomers = (
                <Fragment>
                    <PageTitle>Customers</PageTitle>
                    <Table itens={this.props.customers} head={tableColumns} actions={actions} />
                    {pagination}
                </Fragment>
            );
        }

        return rednderCustomers;
    }
};

const mapStateToProps = state =>{
    return {
        token: state.auth.token,
        customers: state.customers.customers,
        total: state.customers.total,
        offset: state.customers.offset,
        pageSize: state.customers.pageSize,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomers: (token) => dispatch(actions.asyncGetCustomers(token)),
        asyncTestCustomers: (id) => dispatch(actions.asyncTestCustomers(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);