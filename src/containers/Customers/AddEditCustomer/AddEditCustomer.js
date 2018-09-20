import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageTitle from '../../../components/UI/PageTitle/PageTitle';
import InputElement from '../../../components/UI/InputElement/InputElement';

class AddEditCustomer extends Component{
    state={
        inputs:{
            oples:{ value: "value"},
        }
    }
    componentDidMount(){
        console.log(this.props);
        const {match} = this.props;

        if(match.params.id){
            //TODO: pegar customer
        }
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
        console.log(newState)

        this.setState(newState);
    }

    render(){
        const {match} = this.props;
        const {inputs} = this.state;
        return(
            <article>
                <PageTitle>{match.params.id ? "Editar": "Adicionar"} Customer</PageTitle>
                <form>
                    <div className="personal-data">
                        <h2>Dados Pessoais</h2>
                        <div className="linha">
                            <InputElement id="oples" parent="input-group" label="Teste" value={inputs.oples.value} change={this.inputOnChange.bind(this)}/>
                        </div>
                    </div>
                </form>
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