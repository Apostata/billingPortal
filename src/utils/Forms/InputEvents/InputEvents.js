import Validator from '../FormValidation';

export default class InputEvents{
    static inputOnChange(e, id){
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

    static inputOnFocus(id){
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

    static inputOnBlur(id){
        const errorMessage = Validator.fieldValidation(this.state.inputs[id].label, this.state.inputs[id].value, this.state.inputs[id].rules);

        this.setState({
            ...this.state,
            inputs:{
                ...this.state.inputs,
                [id]:{
                    ...this.state.inputs[id],
                    selected: false,
                    errorMessage: errorMessage ? errorMessage : null
                }
            }
        });
    }


    static fillAddress(){
        
    }
}