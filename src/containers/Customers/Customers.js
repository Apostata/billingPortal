import React , {Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import * as actions from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Customers.scss';

class Customers extends Component{

    state ={
        selected: null,
        numPages: this.getPages(),
        page: this.props.offset <= 1 ? 0 :  Math.ceil(this.props.offset/20)
    }

    componentDidMount(){
        this.mounted = true;
        const page = this.getParamPage();        
        this.props.asyncGetCustomers(this.props.token, page, this.props.history);
    }

    componentDidUpdate(prevProps, prevState){
        const {customers, token, history} = this.props;
        const {page, numPages} = this.state;

        if(numPages === 0 && customers){
            this.setState({
                ...this.state,
                numPages: this.getPages(this.props)
            });
        }

        if(prevState.page !== page){
            this.props.asyncGetCustomers(token, (page-1), history);
        }
    }

    getParamPage(){
        const paramPage = this.props.match.params.page;
        let page = 0;

        if(paramPage){
            paramPage > 1? page = (paramPage - 1): page = 0;
        }

        return page;
    }

    getPages(props = this.props){
        let {total, pageSize} = props;
        return Math.ceil(total/pageSize);
    }


    render(){
        let pagination = null;
        let {total, offset, pageSize, loading} = this.props;
        const {numPages} = this.state;
        if(offset < pageSize) offset = 1;
        const index = Math.floor(offset/pageSize);

        const modal = (
            <Modal show={true} backdrop={true}>
                <Spinner />
            </Modal>
        );

        let renderCustomers = modal;

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
                
            ];

            if(numPages > 0){
                pagination = (
                    <Pagination 
                        total={total}
                        pageSize={pageSize}
                        offset={offset} 
                        selected={index} 
                        pages = {numPages}
                        //onChangePage={(offset)=>this.props.asyncGetCustomers(this.props.token, offset)}
                        onChangePage={(index)=>this.setState({...this.state, page: index+1})}
                    />
                );
            }

            renderCustomers = (
                <article className={styles.Customers}>
                    <PageTitle>Customers</PageTitle>
                    {!loading ?
                        <Table
                        itens={this.props.customers}
                        head={tableColumns}
                        actions={actions}
                    />
                    : modal}
                    {pagination}
                </article>
            );
        }

        return renderCustomers;
    }
};

const mapStateToProps = state =>{
    return {
        token: state.auth.token,
        customers: state.customers.customers,
        total: state.customers.total,
        offset: state.customers.offset,
        pageSize: state.customers.pageSize,
        loading: state.customers.loading,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomers: (token, page, pushHistory) => dispatch(actions.asyncGetCustomers(token, page, pushHistory)),
        asyncTestCustomers: (id) => dispatch(actions.asyncTestCustomers(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);