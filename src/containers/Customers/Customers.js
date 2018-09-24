import React , {Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import * as actions from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/UI/Button/Button';
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
        
        if(!this.props.customers){        
            this.props.asyncGetCustomers(this.props.token, page, this.props.history);
        }
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


    addNewCustomer(){
        const {history} = this.props;
        this.props.navigateToAddCustomer(history)
    }

    editCustomer(id){
        const {history, customers} = this.props;
        const customer = customers.filter(customer=> customer.id === id);
        this.props.setSelectedCustomer(customer[0])
        this.props.navigateToEditCustomer(id, history);
    }

    toggleActiveCustomer(id, status){
        const {token, customers} = this.props;
        const {page} = this.state;
        this.props.toggleActivateCustomer(token, id, status, page, customers);
    }

    render(){
        let pagination = null;
        let {total, offset, pageSize, loading} = this.props;
        const {numPages} = this.state;
        if(offset < pageSize) offset = 1;
        const index = Math.floor(offset/pageSize);


        const addButtonLine = (
            <div className={[styles.ButtonLine, styles.alignRight].join(' ')}>
                <Button classes="add" click={this.addNewCustomer.bind(this)}>Adicionar</Button>
            </div>
        );

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
                {
                    name: 'Editar',
                    classes:'edit',
                    action: this.editCustomer.bind(this)
                },
                {
                    name: 'Excluir', 
                    classes:'delete',
                    action: ()=>{console.log('teste')}
                },
                {
                    name: {"ACTIVE":"Desativar","INACTIVE":"Ativar"},
                    classes:'activate', 
                    action: this.toggleActiveCustomer.bind(this)
                }
                
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

                    {addButtonLine}

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
        selectedCustomer: state.customers.selectedCustomer,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        asyncGetCustomers: (token, page, pushHistory, customers) => dispatch(actions.asyncGetCustomers(token, page, pushHistory, customers)),
        setSelectedCustomer: (customer) => dispatch(actions.setSelectedCustomer(customer)),
        navigateToEditCustomer:(id, pushHistory) => dispatch(actions.navigateToEditCustomer(id, pushHistory)),
        navigateToAddCustomer:(pushHistory) => dispatch(actions.navigateToAddCustomer(pushHistory)),
        toggleActivateCustomer:(token, id, status, page, customers)=>dispatch(actions.toggleActivateCustomer(token, id, status, page, customers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);