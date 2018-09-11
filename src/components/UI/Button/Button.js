import React from 'react';
import styles from './Button.scss';
import FontAwesome from '../FontAwesone/FontAwesome';

const button = (props) =>{
    let classes = [styles.Button];
    let icon = null;

    if(props.classes){
        let inheritedClasses = props.classes.split(' ');
        inheritedClasses.forEach(classe => {

            if(classe.indexOf('Pagination') === -1){
                classes.push(styles[classe]);
            }
            else{
                console.log(classe)
                classes.push(classe);
            }
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
        case "Primeira":
            icon = <FontAwesome icon='fa-angle-double-left' />
            break;
        case "Última":
            icon = <FontAwesome icon='fa-angle-double-right' />
            break;

        default:
            icon = null;
            break;
    }

    return(
        <button disabled={props.disable} className={classes.join(' ')} onClick={()=>props.click()}>
            {props.children !== "Última" ? icon: null} {props.children} {props.children === "Última" ? icon: null}
        </button>
    )
};

export default button;