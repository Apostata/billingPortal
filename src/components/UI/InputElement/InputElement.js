import React, {Fragment} from 'react';
import styles from './InputElement.scss';
import PropTypes from 'prop-types';

const input = (props) => {

    let { element, value, classes, id, label, parent, options, change, focus, blur, selected, ...attributes } = props;
    let input, parentContainer;
    let inputLabel = null

    let finalClasses = [];
    let parentClasses = [styles[parent]];

    if(classes){
        var inheritedClasses = classes.split(' ').map((classe)=>{return styles[classe]});
        finalClasses = finalClasses.concat(inheritedClasses);
    };

    finalClasses.push(styles.InputElement);

    if(value || selected){
        finalClasses.push(styles['active']);
        parentClasses.push(styles['active'])
    }
    
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
                    id={id}
                    onChange={change}
                >
                    { renderOptions() }
                </select>
            );
            break;
        case "textarea":
            input = <textarea id={id} className={finalClasses.join(' ')} {...attributes} onChange={change?(e)=>change(e,id):null} onFocus={focus?()=>focus(id):null} onBlur={blur?()=>blur(id):null}>{value || ""}</textarea>;
            break;

        default:
            input = <input type="text" id={id} className={finalClasses.join(' ')} value={value || ""} {...attributes} onChange={change?(e)=>change(e,id):null} onFocus={focus?()=>focus(id):null} onBlur={blur?()=>blur(id):null}/>
    }

    if(label){
        inputLabel = <label htmlFor={id} className={finalClasses.join(' ')} >{label}</label>;
    }

    if(parent){
       
        parentContainer = (
            <div className={parentClasses.join(" ")}>
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
};

input.propTypes ={
    id: PropTypes.string.isRequired
}

export default input;

/*
    exemplos de uso
    <InputElement element="select" options={[{name:"teste1", value:1}, {name:"teste2", value:2}]}/>
    <InputElement element="textarea" value="teste"/>
    <InputElement value="teste"/>
*/