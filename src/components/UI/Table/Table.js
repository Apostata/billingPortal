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
       
        const headItens = Object.keys(props.head).map((title, idx)=>{
            return <th key={idx}>{props.head[title]}</th>
        });

        tableHead = (
            <thead>
                <tr>
                    {headItens}
                </tr>
            </thead>
        );
    }

    let finalItens = null;

    filteredItens.length > 0 ? finalItens = filteredItens : finalItens = props.itens;

    let tableRows = finalItens.map((item, idx) =>{
        const {id, ...propItem} = item;
        const itemId  = item.id ? item.id: idx;
        
        return (
            <TableRow key={itemId} id={itemId} {...propItem}  />
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