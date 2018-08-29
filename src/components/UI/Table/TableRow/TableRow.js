import React from 'react';
import TableColumn from './TableColumn/TableColumn';
import styles from './TableRow.scss';

const tableRow = (props) =>{
    const renderRow = Object.keys(props).map((column, idx)=>{
        return (
            <TableColumn key={idx} id={props.id}>
                {props[column]}
            </TableColumn>
        );
    });

    return(
        <tr className={styles.TableRow} id={props.id}> 
            {renderRow}
        </tr>
    );
};

export default tableRow;