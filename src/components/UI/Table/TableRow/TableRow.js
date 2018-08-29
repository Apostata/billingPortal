import React from 'react';
import TableColumn from './TableColumn/TableColumn';
import styles from './TableRow.scss';

const tableRow = (props) =>{
    const renderRow = Object.keys(props).map((column, idx)=>{
        if(column !== 'type'){
            return (
                <TableColumn type={props.type} key={idx} id={props.id}>
                    {props[column]}
                </TableColumn>
            );
        }
    });

    return(
        <tr className={styles.TableRow} id={props.id}> 
            {renderRow}
        </tr>
    );
};

export default tableRow;