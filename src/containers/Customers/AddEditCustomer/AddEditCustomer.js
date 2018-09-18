import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageTitle from '../../../components/UI/PageTitle/PageTitle';


class AddEditCustomer extends Component{
    componentDidMount(){
        console.log(this.props);
        const {match} = this.props;

        if(match.params.id){
            //TODO: pegar customer
        }
    }

    render(){
        const {match} = this.props;
        return(
            <article>
                <PageTitle>{match.params.id ? "Editar": "Adicionar"} Customer</PageTitle>
                
            </article>
        )
    }
}

const mapStateToProps = state =>{
    return{
        
    };
};

const mapDispatchToProps = dispatch =>{
    return{

    };
}

export default connect(null, null)(AddEditCustomer);