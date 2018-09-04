import React from 'react';
import styles from './Button.scss';

const button = (props) =>{
    let classes = [styles.Button];
    
    if(props.classes){
        let inheritedClasses = props.classes.split(' ');
        inheritedClasses.forEach(classe => {
            classes.push(styles[classe]);
        });
    }

    return(
        <button className={classes.join(' ')} onClick={()=>props.click()}>
            {props.children}
        </button>
    )
};

export default button;