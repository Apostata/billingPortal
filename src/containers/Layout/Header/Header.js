import React from 'react';
import styles from './Header.scss';
import Logo from './Logo/Logo';
import Container from '../../../components/UI/Container/Container';

const header = (props)=>{
    return(
        <header className={styles.Header}>
            <Container classes={styles.Container}> 
                <Logo />
            </Container>
        </header>
    )
}

export default header;