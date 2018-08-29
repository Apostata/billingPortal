import React from 'react';
import loadAsyncComponent from '../../../../../hoc/asyncImportComponent';
import styles from './TableColumn.scss';

const AsyncButton = loadAsyncComponent(()=>{
    return import('../../../Button/Button')
});

const tableColumn = (props) =>{
    
    let renderColumn = <td className={styles.TableColumn} >{props.children}</td>;

    if(props.children instanceof Array){
        let buttons = null;

        buttons = props.children.map((action, idx) =>{
            return <AsyncButton key={`${action.name}_${idx}`} click={()=>action.action(props.id)}>{action.name}</AsyncButton>
        }); 

        renderColumn = <td className={styles.TableColumn} >{buttons}</td>
    }
    return renderColumn;
};

export default tableColumn;