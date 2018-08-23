import React, {Component, Fragment} from 'react'; 
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.scss';

/*
    Modal deve receber:
    props:
        show -> para mostrar ou esconder o modal
        backdropClick(e fechar modal) -> para quando clicar fora ou no botão fechar do modal

*/
class Modal extends Component {
    
    render(){
        let classes = ["modal "];
        if(this.props.show){
            classes.push(styles.Show);
        }

        return(
            <Fragment>
                <Backdrop show={this.props.show} />
                <div className={classes.join("")} >
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;