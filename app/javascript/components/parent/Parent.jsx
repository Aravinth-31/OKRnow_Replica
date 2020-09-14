import React from 'react';
import Child from './Child';

class Parent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
        <div className="par">
            <h1>{this.state.name}</h1>
            <Child handleChange={this.handleChange}></Child>
        </div>
        );
    }
}
export default Parent;