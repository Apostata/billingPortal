import React, {Component} from 'react';
import InputElement from '../../../components/UI/InputElement/InputElement';
import InputEvents from '../../../utils/Forms/InputEvents/InputEvents';


class Forms extends Component {
    state={
        inputs: null,
    };

    componentDidMount(){
        let {data} = this.props;
        this.mountInputs(data);
    }

    mountInputs(data){
        let inputs ={};
        let {fieldNames, fieldClasses} = this.props;

        const fetchData = (data, parentNode = null) =>{
            let parentIndex = 1;
           
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
                    inputs[id].value = data[node] || "";
                    inputs[id].change = InputEvents.inputOnChange.bind(this);
                    inputs[id].focus = InputEvents.inputOnFocus.bind(this);
                    inputs[id].blur = InputEvents.inputOnBlur.bind(this);
                    inputs[id].selected = false;
                }

                
            });

        };

        fetchData(data);
        
        this.setState({
            ...this.state,
            inputs
        });
        
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
                <InputElement
                    id={inputs[input].id}
                    key={`${inputs[input].label}-${idx}`}
                    {...inputs[input]}
                    value={inputs[input].value} 
                /> 
            );
        }

        return (
            <form>
                {inputs?recursiveFetchField(data):null}
            </form>
        )
    }
};

export default Forms;