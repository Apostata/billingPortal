import React, {Component, Fragment} from 'react';
import InputElement from '../../../components/UI/InputElement/InputElement';
import InputEvents from '../../../utils/Forms/InputEvents/InputEvents';
//import Validator from '../../../utils/Forms/FormValidation';

class Forms extends Component {
    state={
        inputs: null,
        validForm: false
    };
    

    componentDidMount(){
        let {data} = this.props;
        this.mountInputs(data);
    }

    mountInputs(data){
        let inputs ={};
        let {fieldNames, fieldClasses, fieldRules} = this.props;
        const fetchData = (data, parentNode = null) =>{
                       
            Object.keys(data).forEach( node =>{
               
                if(typeof data[node] === "object" && data[node]){
                    fetchData(data[node], node);
                }
                else{
                    let id;
                    parentNode && parentNode!=="personal" ? id = `${parentNode}_${node}`: id = node;
                    //element, value, classes, id, label, parent, options, change, ...attributes
                    inputs[id] = {};
                    inputs[id].element = 'input';
                    inputs[id].label = fieldNames[node];
                    inputs[id].id = id;
                    inputs[id].name = id;
                    inputs[id].parentClasses = fieldClasses;
                    inputs[id].parent= `inputGroup`;
                    inputs[id].value = String(data[node]) || "";
                    if(fieldRules[node]){
                        if(fieldRules[node].mask) inputs[id].mask = fieldRules[node].mask;
                        if(fieldRules[node].rules) inputs[id].rules = fieldRules[node].rules;
                    }
                    inputs[id].change = InputEvents.inputOnChange.bind(this);
                    inputs[id].focus = InputEvents.inputOnFocus.bind(this);
                    inputs[id].blur = InputEvents.inputOnBlur.bind(this);
                    inputs[id].selected = false;
                    inputs[id].errorMessage = null;
                    inputs[id].valid = data[node] ? true : false;
                }

                
            });

        };

        fetchData(data);
        
        this.setState({
            ...this.state,
            inputs
        });
        
    }

    submitForm(e){
        e.preventDefault();
    }

    render(){
        
        const {inputs} = this.state;
        let {fieldNames, sectionClasses, data} = this.props;

        const recursiveFetchField = (data, parentNode = null)=>{

            return Object.keys(data).map((field, idx)=>{
                    
                if(data[field] && typeof data[field] === "object"){
                    return (
                        <div key={`${field}-${idx}`} className={sectionClasses}>
                            <h3>{fieldNames.titles[field]}</h3>
                            {recursiveFetchField(data[field], field)}
                        </div>
                    );
                }

                else{
                    let input;
                    if(parentNode && parentNode !=='personal'){
                        input = `${parentNode}_${field}`;
                    }
                    else{
                        input = field;
                    }
                    
                    return returInput(input, idx);
                }
            });
        };

        const returInput = (input, idx)=>{
            return(
                <Fragment key={`${inputs[input].label}-${idx}`}>
                    <InputElement
                        id={inputs[input].id}
                        
                        {...inputs[input]}
                        value={inputs[input].value} 
                    /> 
                    {/* {inputs[input].rules? this.validator.message(inputs[input].label, this.state[input], inputs[input].rules): null} */}
                </Fragment>
            );
        }

        return (
            <form>
                {inputs?recursiveFetchField(data):null}
                <button onClick={(e)=>{this.submitForm(e)}}></button>
            </form>
        )
    }
};

export default Forms;