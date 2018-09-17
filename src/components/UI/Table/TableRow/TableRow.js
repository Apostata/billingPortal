import React from 'react';
import TableColumn from './TableColumn/TableColumn';
import styles from './TableRow.scss';

const tableRow = (props) =>{
    let inherithClasses = [];  

    if(props.classes){
        inherithClasses = props.classes.split(' ');
    }

    inherithClasses.push(styles.TableRow);

    const renderRow = Object.keys(props).map((column, idx) =>{
        if(column !== 'type' && column !== 'classes'){
            if(column === "actions"){
                return (
                <TableColumn toggle={props.status} classes={`${column}`} type={props.type} key={idx} id={props.id}>
                    {props[column]}
                </TableColumn>
                );
            }
            
            return (
                <TableColumn classes={`${column}`} type={props.type} key={idx} id={props.id}>
                    {props[column]}
                </TableColumn>
            );
        }
        else{
            return null;
        }
    });

    return(
        <tr className={inherithClasses.join(' ')} id={props.id}> 
            {renderRow}
        </tr>
    );
};

export default tableRow;