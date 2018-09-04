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
                    return {id:idx , selected: false}
                })
            });
        }
    }

    setSelected(id){
        let deselecAll = {
            ...this.state
        }

        deselecAll.pages.map(page=>{
            if(page.id !== id){
                page.selected = false;
            }
            else{
                page.selected = true;
            }

        });

       this.setState({
           ...deselecAll
       })
    }

    render(){
        let pagination = null;

        if(this.state.pages){
            pagination = this.state.pages.map(page=>{
                return (
                <li key={`pg-${page.id}`}>
                    <Button selected={page.selected} click={()=>this.setSelected(page.id)}>{page.id + 1}</Button>
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