import React from 'react';
import styles from './Backdrop';

const backdrop = props =>(
    props.show? <div className="backdrop">Backdrop</div> : null
);

export default backdrop;