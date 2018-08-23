import React, {Component, Fragment} from 'react';

class Layout extends Component {
    render(){
        return(
            <Fragment>
                <div>Cabeçalho</div>
                <main>
                    {this.props.children}
                </main>
                <div>Rodapé</div>
            </Fragment>
        )
    }
}

export default Layout;