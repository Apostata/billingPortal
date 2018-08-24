import React, {Component, Fragment} from 'react';
import Header from './Header/Header';
import Container from '../../components/UI/Container/Container';

class Layout extends Component {
    render(){
        return(
            <Fragment>
                <Header />
                <main>
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                {/*rodapé?*/}
            </Fragment>
        )
    }
}

export default Layout;