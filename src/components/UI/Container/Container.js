
import React from 'react';
import styles from './Container.scss';

const container = (props) =>{
    let classes = [];  

    if(props.classes){
        classes = props.classes.split(' ');
    }

    classes.push(styles.Container);

    return(
        <div className={classes.join(' ')}>
            {props.children}
        </div>
    )
}

export default container;