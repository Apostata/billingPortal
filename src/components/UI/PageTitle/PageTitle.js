import React from 'react';
import styles from './PageTitle.scss';

const pageTitle = (props) =>{
    return(
        <h1 className={styles.PageTitle}>
            {props.children}
        </h1>
    )
}

export default pageTitle;