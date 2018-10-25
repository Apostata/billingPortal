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
}