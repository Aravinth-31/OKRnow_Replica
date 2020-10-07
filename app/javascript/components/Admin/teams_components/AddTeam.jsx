import React from 'react';
import $ from 'jquery';
import '../../../styles/Admin/teams/AddTeam.css';
import Select from 'react-select'
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post, Patch,Interceptor } from '../../../utils/Helper';

class AddTeam extends React.Component {
    options = [
        { value: 'Vinitha Shree', label: 'Vinitha Shree' },
        { value: 'Suresh Kumar', label: 'Suresh Kumar' },
    ]
    update = false;
    added = false;
    constructor(props) {
        super(props)
        this.state = {
            selectedOptions: [],
            name: '',
            dept: '',
            users: [],
            reporting_manager: [{ name: '', from: '', to: '' }]
        }
    }
    handleChange = (selectedOptions) => {
        this.setState({ selectedOptions })
    }
    componentDidMount() {
        Interceptor();
        const This = this;
        $('#check').click(function () {
            $('#date-to').prop('disabled', function (i, v) {
                return !v;
            })
        })
        $(document).ready(function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            $('#datePicker').val(today);
            $('#date-from').val(today);
            if (This.props.location.state) {
                This.update = true;
                const team = This.props.location.state.team;
                var options = []
                team.users.map((val, i) => { options.push({ value: val, label: val }) })
                This.setState({ selectedOptions: options })
                Object.keys(team).map(function (key, index) {
                    if (key == 'reporting_manager') {
                        const val = team[key];
                        val.map((v, i) => {
                            val[i] = JSON.parse(v);
                        });
                        if (val.length == 0)
                            val = [{ name: '', from: '', to: '' }];
                        This.setState({ [key]: val });
                    }
                    else
                        This.setState({ [key]: team[key] });
                })
            }
        });
    }
    add =async (e) => {
        e.preventDefault();
        const users = []
        this.state.selectedOptions.map((user, index) => { users.push(user.value) });
        let emn = [];
        this.state.reporting_manager.map((val, index) => {
            emn.push(JSON.stringify(val))
        })
        let url = "/api/v1/teams";
        const { name, dept } = this.state;
        const body = { name, dept, users, reporting_manager: emn }
        if (this.update) {
            url += '/' + this.state.id;
            try {
                const response = await Patch(url, body);
                console.log(response);
                this.added = true;
                this.forceUpdate();
            } catch (err) { console.log(err); }
        }
        else {
            try {
                const response = await Post(url, body);
                console.log(response);
                this.added = true;
                this.forceUpdate();
            } catch (err) { console.log(err); }
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    managerHandler = (e, i) => {
        const mng = this.state.reporting_manager;
        mng[i][e.target.name] = e.target.value;
        this.setState({ reporting_manager: mng });
    }
    addManager = () => {
        const mng = this.state.reporting_manager;
        mng.push({ name: '', from: '', to: '' });
        this.setState({ reporting_manager: mng }, () => this.forceUpdate);
    }
    removeManager = (i) => {
        var mng = []
        this.state.reporting_manager.map((val, i) => mng.push(val));
        mng.splice(i, 1)
        this.setState({ reporting_manager: mng }, () => this.forceUpdate());
    }
    render() {
        if (this.added)
            return <Redirect to='/home/team'></Redirect>
        else
            return (
                <div className="addTeam">
                    <div className="head">
                        Team Add or Edit
            	</div>
                    <br />
                    <h2 className="titles">Enter Team Details</h2>
                    <div className="ta-form">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Team Name</label>
                                    <input className="form-control" type="text" value={this.state.name} name='name' onChange={this.onChangeHandler}></input>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Department Name</label>
                                    <select className="form-control" value={this.state.dept} name='dept' onChange={this.onChangeHandler}>
                                        <option className="form-control" disabled value="">Select...</option>
                                        <option className="form-control">Back-end</option>
                                        <option className="form-control">Front-end</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="rept">
                        <div className="head">
                            <h2>HOD Details</h2>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>NO</th>
                                    <th>HOD</th>
                                    <th>FROM</th>
                                    <th>TO</th>
                                    <th></th>
                                </tr>
                                {this.state.reporting_manager.map((val, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <select className="form-control" value={val.name} name="name" onChange={(e) => this.managerHandler(e, index)}>
                                                    <option className="form-control" disabled value=''>Select</option>
                                                    <option className="form-control" value='Suresh Kumar'>Suresh Kumar</option>
                                                    <option className="form-control" value='Vinitha Shree'>Vinitha Shree</option>
                                                </select>
                                            </td>
                                            <td><input className="form-control" type="date" id="date-from" value={val.from} name="from" onChange={(e) => this.managerHandler(e, index)}></input></td>
                                            <td><input className="form-control" type="date" id="date-to" value={val.to} name="to" onChange={(e) => this.managerHandler(e, index)}></input></td>
                                            <td className="check"><input type="checkbox" name="" id="check" />
                                                <span>Till now</span>
                                                {this.state.reporting_manager.length > 1 ?
                                                    <FontAwesomeIcon icon={faTrash} onClick={() => this.removeManager(index)} className="delete"></FontAwesomeIcon>
                                                    : null
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="foot">
                            <p onClick={this.addManager}>Add New</p>
                        </div>
                    </div>
                    <br />
                    <h2 className="titles">Team Users</h2>
                    <div className="taa-form">
                        <div className="form-group">
                            <label>Select Team Users</label>
                            <Select
                                options={this.options}
                                isMulti
                                value={this.state.selectedOptions}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className="footer">
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}

export default AddTeam;