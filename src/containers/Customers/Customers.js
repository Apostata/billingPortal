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
        pages: this.getPages()
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps, nextState);
    //     if(this.props.customers || this.state.pages === 0){
    //         return true;
    //     }

    //     return false;
    // }

    componentDidMount(){
        this.props.asyncGetCustomers(this.props.token);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pages === 0 && this.props.customers){
            
            this.setState({
                ...this.state,
                pages: this.getPages(this.props)
            });
        }
    }

    getPages(props = this.props){
        let {total, pageSize} = props;
        return Math.ceil(total/pageSize);
    }

    selectPage(id){
        let deselectAll = {
            ...this.state
        }

        deselectAll.pages.map(page=>{
            return page.id !== id ? page.selected = false : page.selected = true;

        });

        this.setState({
            ...deselectAll
        });

       this.props.asyncGetCustomers(this.props.token, id);
    }

    render(){
        let pagination = null;
        let {total, offset, pageSize} = this.props;
        const {pages} = this.state;

        if(offset < pageSize) offset = 1;
        const index = Math.floor(offset/pageSize);


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
                
            ];

            if(pages > 0){
                pagination = (
                    <Pagination 
                        total={total}
                        pageSize={pageSize}
                        offset={offset} 
                        selected={index} 
                        pages = {pages}
                        onChangePage={(offset)=>this.props.asyncGetCustomers(this.props.token, offset)}
                    />
                );
            }

            rednderCustomers = (
                <article className={styles.Customers}>
                    <PageTitle>Customers</PageTitle>
                    <Table itens={this.props.customers} head={tableColumns} actions={actions} />
                    {pagination}
                </article>
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
        asyncGetCustomers: (token, offset) => dispatch(actions.asyncGetCustomers(token, offset)),
        asyncTestCustomers: (id) => dispatch(actions.asyncTestCustomers(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);