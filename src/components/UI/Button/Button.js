import React from 'react';
import styles from './Button.scss';

const button = (props) =>{
    let classes = [styles.Button];
    if(props.classes){
        classes.push(props.classes);
    }
    return(
        <button className={classes.join(' ')} onClick={()=>props.click()}>
            {props.children}
        </button>
    )
};

export default button;