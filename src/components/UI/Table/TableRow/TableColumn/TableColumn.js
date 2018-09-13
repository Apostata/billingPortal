import React from 'react';
//import loadAsyncComponent from '../../../../../hoc/asyncImportComponent';
import styles from './TableColumn.scss';
import Button from '../../../Button/Button';

const tableColumn = (props) =>{
    let classes = [];

    if(props.classes){
        let inheritedClasses = props.classes.split(' ');
        inheritedClasses.forEach(classe => {
            classes.push(styles[classe]);
        });
    }

    classes.push(styles.TableColumn);

    let renderColumn = null;

    if(props.type ==="th"){
        renderColumn = <th className={classes.join(' ')} >{props.children}</th>;
    }
    else{
        renderColumn = <td className={classes.join(' ')} >{props.children}</td>;
    }

    if(props.children instanceof Array){
        let buttons = null;

        buttons = props.children.map((action, idx) =>{
            return <Button classes={action.classes} key={`${action.name}_${idx}`} click={()=>action.action(props.id)}>{action.name}</Button>
        }); 
        if(props.type ==="th"){
            renderColumn = <th className={classes.join(' ')} >{buttons}</th>
        }
        else{
            renderColumn = <td className={classes.join(' ')} >{buttons}</td>
        }
    }
    return renderColumn;
};

export default tableColumn;