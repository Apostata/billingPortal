import React from 'react';
import logoImg from '../../../img/uol-logo-mini.png';
import {NavLink} from 'react-router-dom';
import styles from './Logo.scss';

const logo = (props) =>{
    return(
        <div className={styles.Logo}>
            <NavLink to="/">
                <img src={logoImg} alt="UOL Diveo"/>
            </NavLink>
        </div>
    )
}

export default logo;