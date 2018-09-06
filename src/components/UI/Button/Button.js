import React from 'react';
import styles from './Button.scss';
import FontAwesome from '../FontAwesone/FontAwesome';

const button = (props) =>{
    let classes = [styles.Button];
    let icon= null;

    if(props.classes){
        let inheritedClasses = props.classes.split(' ');
        inheritedClasses.forEach(classe => {
            classes.push(styles[classe]);
        });
    }

    switch(props.children){
        case "Editar":
            icon = <FontAwesome icon='fa-edit' />;
            break;
        case "Excluir":
            icon = <FontAwesome icon='fa-trash' />;
            break;
        case "Ativar":
            icon = <FontAwesome icon='fa-check' />
            break;
        default:
            icon = null;
            break;
    }

    return(
        <button disabled={props.disable} className={classes.join(' ')} onClick={()=>props.click()}>
            {icon} {props.children}
        </button>
    )
};

export default button;