import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './MenuItem.scss';

const menuItem = (props) =>{
    return <NavLink className={styles.MenuItem} to={props.path} >{props.name}</NavLink>
}

export default menuItem;