import React, {Component, Fragment} from 'react'; 
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.scss';

class Modal extends Component {
    shouldComponentUpdate(nextProps){
        //retorna true se nextProps.show ou nexProps.children diferente da anterior
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        let classes = [styles.Modal];
        if(this.props.show){
            classes.push(styles.Show);
        }
        return(
            <Fragment>
                {this.props.backdrop ? <Backdrop show={this.props.show} />: null}
                <div className={classes.join(" ")} >
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;