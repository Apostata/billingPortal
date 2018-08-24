import React from 'react';
import styles from './Header.scss';
import Logo from './Logo/Logo';
import Container from '../UI/Container/Container';
import Menu from '../Menu/Menu';

const header = (props)=>{
    return(
        <header className={styles.Header}>
            <Container classes={styles.Container}> 
                <Logo />
                <Menu/>
            </Container>
        </header>
    )
}

export default header;