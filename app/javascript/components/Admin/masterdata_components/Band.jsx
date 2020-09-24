import React from 'react';
import '../../../styles/Admin/MasterData/Child.css';

class Band extends React.Component {
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
                    <h6>Add New Band</h6>
                    <div className="form-group text-secondary px-3 py-2">
                        <label>Band Title</label>
                        <div className="group d-flex mt-2">
                            <input name='data' value={this.state.data} onChange={this.onChangeHandler} className="form-control border-top-0 border-left-0 border-right-0 rounded-0 col-5" placeholder="Enter Band"></input>
                            <button className="addBand col-2 ml-4 rounded" onClick={() => {
                                this.props.handleChange('band', 'add', this.state.data);
                                this.setState({ data: '' });
                            }}>Add</button>
                        </div>
                    </div>
                </div>
                <hr className="text-muted" />
                <div className="output p-2">
                    <h6 className="pl-3">Band-Tags</h6>
                    <ul className="mt-3 d-flex">
                        {this.props.data.map((band, index) => {
                            return (
                                <li className="" key={index}><span className="title mr-4">{band}</span><span className="closer" onClick={() => this.props.handleChange('band', 'delete', band)}>X</span></li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Band;