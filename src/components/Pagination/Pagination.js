import React, {Component} from 'react';
import Button from '../UI/Button/Button';

class Pagination extends Component{
    state ={
       pages: null
    }

    componentDidMount(){
        if(this.props.pages){

            this.setState({
                ...this.state,
                pages: this.props.pages.map((_, idx)=>{
                    return {idx , selected: false}
                })
            });
        }
    }

    setSelected(idx){

    }

    render(){
        let pagination = null;

        if(this.state.pages){
            pagination = this.state.pages.map((_, idx)=>{
                return (
                <li key={`pg-${idx}`}>
                    <Button click={()=>this.setSelected(idx).bind(this)}>{idx + 1}</Button>
                </li>);
            });
        }

        return (
            <ul>
                {pagination}
            </ul>
        );
    }    
}

export default Pagination;