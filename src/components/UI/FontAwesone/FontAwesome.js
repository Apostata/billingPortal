import React from 'react';
import fa from 'font-awesome/css/font-awesome.min.css';

const FontAwesome = (props) => {
    let classes = [fa['fa']];
    const inheritedClasses = props.icon.split(' ');

    inheritedClasses.forEach(classe => {
        classes.push(fa[classe]);
    });

    return <i className={classes.join(' ')}></i>
}

export default FontAwesome;