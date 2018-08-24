import React from 'react';
import logoImg from '../../../../img/uol-logo-mini.png';
import {NavLink} from 'react-router-dom';

const logo = (props) =>{
    return(
        <NavLink to="/">
            <img src={logoImg} alt="UOL Diveo"/>
        </NavLink>
    )
}

export default logo;