import React from 'react';
import Button from '../UI/Button/Button';
import PageDisplay from './PageDisplay/PageDisplay';
import styles from './Pagination.scss';

const pagination = (props)=>{
    const   pages = new Array(props.pages).fill(undefined), //precisa ter algo no array
            currentPage = props.selected + 1, 
            totalPages = Math.ceil(props.total/props.pageSize);

    let pagination = null;

    if(pages){
        if(pages.length > 0){
            
            pages.map((_,idx)=>{
               return pages[idx] = {id:idx, selected:props.selected === idx ? true : false };
            });

            pagination = pages.map(page=>{
                return (
                <li key={`pg-${page.id}`}>
                    <Button disable={props.selected === page.id ? true : false} selected={page.selected} click={()=>props.onChangePage(page.id)}>{page.id + 1}</Button>
                </li>);
            });
        }
    }
    
    return (
        <div className={styles.Pagination}>
            <PageDisplay current={currentPage} total={totalPages} />
            <ul>
                <li><Button disable={props.selected === 0 ? true : false} click={()=>props.onChangePage(0)}>Primeira</Button></li>
                {pagination}
                <li><Button disable={props.selected === (props.pages - 1) ? true : false} click={()=>props.onChangePage((props.pages - 1))}>Última</Button></li>
            </ul>
        </div>
    );
}

export default pagination;