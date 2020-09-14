import React from 'react';
import '../../styles/MasterData/Child.css';

class SpecialEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="child">
                <div className="input p-2">
                    <h6>Add New Special Employee</h6>
                    <div className="form-group text-secondary px-3 py-2">
                        <label>Special Employee Title</label>
                        <div className="group d-flex mt-2">
                            <input name='data' onChange={this.onChangeHandler} className="form-control border-top-0 border-left-0 border-right-0 rounded-0 col-5" placeholder="Enter Special Employee"></input>
                            <button className="addBand col-2 ml-4 rounded" onClick={() => {
                                this.props.handleChange('specEmp', 'add', this.state.data);
                                this.setState({ data: '' });
                            }}>Add</button>
                        </div>
                    </div>
                </div>
                <hr className="text-muted" />
                <div className="output p-2">
                    <h6 className="pl-3">Special Employee-Tags</h6>
                    <ul className="mt-3 d-flex">
                        {this.props.data.map((se, index) => {
                            return (
                                <li className="" key={index}><span className="title mr-4">{se}</span><span className="closer" onClick={() => this.props.handleChange('specEmp', 'delete', se)}>X</span></li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SpecialEmployee;