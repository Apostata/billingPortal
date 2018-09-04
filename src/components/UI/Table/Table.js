import React from 'react';
import TableRow from './TableRow/TableRow';
import styles from './Table.scss';

const table = (props) =>{
    let tableHead = null;
    let filteredItens = [];

    if(props.head){
        let headArr = Object.keys(props.head);
        
        props.itens.map(item =>{
            let obj ={};

            headArr.forEach(title=>{
                if(item[title]){
                    obj[title] = item[title];
                }
                else{
                    if(title === 'actions'){
                        obj[title] = props.actions
                    }
                }
            });

            return filteredItens.push(obj);
        });                      
       
        tableHead = (
            
            <thead>
                <TableRow classes={styles.TableRow} type={'th'} key={1}  {...props.head}  />
            </thead>
        );
    }

    let finalItens = null;

    filteredItens.length > 0 ? finalItens = filteredItens : finalItens = props.itens;

    let tableRows = finalItens.map((item, idx) =>{
        const {id, ...propItem} = item;
        const itemId  = item.id ? item.id: idx;
        
        return (
            <TableRow classes={styles.TableRow} type={'td'} key={itemId} id={itemId} {...propItem}  />
        );
    });

    if(tableRows.length <= 0){
        tableRows = <tr><td>Sem itens</td></tr>
    }


    return (
        <table className={styles.Table}>
            {tableHead}
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
};

export default table;