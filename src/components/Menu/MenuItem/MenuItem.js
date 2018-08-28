import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './MenuItem.scss';

const menuItem = (props) =>{
    return (
    <li className={styles.MenuItem} >
        <NavLink to={props.path} activeClassName={styles.active}>{props.name}</NavLink>
    </li>);

}

export default menuItem;