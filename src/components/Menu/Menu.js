import React from 'react';
import links from '../../json/menu.json';
import MenuItem from './MenuItem/MenuItem';
import styles from './Menu.scss';

const menu = () =>{
    const getNavitens = ()=>{
       return Object.keys(links).map((key, idx)=>{
            return <MenuItem key={idx} path={links[key]} name={key}/>
        });
    }
    
    return(
        <div className="" >
            <ul>
                {getNavitens()}
            </ul>
        </div>
    )
}

export default menu;