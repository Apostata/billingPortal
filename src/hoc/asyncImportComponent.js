import React, {Component} from 'react';

const asyncComponent = (importedComponent) =>{
    return class extends Component{
        state ={
            component: null
        }

        componentDidMount(){
            importedComponent()
            .then(component =>{
                this.setState({
                    component: component.default
                })
            })
        }

        render(){
            const COMPONENT = this.state.component;
            return COMPONENT ? <COMPONENT {...this.props} />: null;
        }
    }
};

export default asyncComponent;