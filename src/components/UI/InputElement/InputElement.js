import React, {Fragment} from 'react';
import styles from './InputElement.scss';

const input = (props) => {

    let { element, value, classes, id, label, parent, options, change, ...attributes } = props;
    let input, parentContainer;
    let inputLabel = null

    let finalClasses = [];

    if(classes){
        var inheritedClasses = classes.split(' ');
        finalClasses.concat(inheritedClasses);
    };

    finalClasses.push(styles.InputElement);

    switch(props.element){
        case "select":
            const renderOptions = ()=>{
                
               return options.map((option, idx)=>{
                    console.log(option);
                    return (
                        <option
                            key={idx}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    );
                });
               
            };

            input = (
                <select 
                    className={finalClasses.join(' ')}
                    {...attributes}
                    id={id?`#${id}`:null}
                    onChange={change}
                >
                    { renderOptions() }
                </select>
            );
            break;
        case "textarea":
            input = <textarea id={id?`#${id}`:null} className={finalClasses.join(' ')} {...attributes} onChange={change} onChange={change}>{value||""}</textarea>;
            break;

        default:
            input = <input id={id?`#${id}`:null} className={finalClasses.join(' ')} value={value||""} {...attributes} onChange={change} onChange={props.change?(e)=>props.change(e,id):(e)=>{console.log(e)}}/>
    }

    if(label){
        inputLabel = <label htmlFor={id?id:null} >{label}</label>;
    }

    if(parent){
        parentContainer = (
            <div className={parent}>
                {inputLabel}
                {input}
            </div>
        );
    }
    else{
        parentContainer = (
            <Fragment>
                {inputLabel}
                {input}
            </Fragment>
        )
    }

    return parentContainer;
}

export default input;

/*
    exemplos de uso
    <InputElement element="select" options={[{name:"teste1", value:1}, {name:"teste2", value:2}]}/>
    <InputElement element="textarea" value="teste"/>
    <InputElement value="teste"/>
*/