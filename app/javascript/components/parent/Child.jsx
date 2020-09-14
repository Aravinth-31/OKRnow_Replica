import React from 'react';

class Child extends React.Component{
    render(){
        return(
            <div className="hil">
                <input type="text" value={this.props.name} name='name' onChange={this.props.handleChange}/>
            </div>
        );
    }
}
export default Child;