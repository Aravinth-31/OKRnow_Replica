import React from 'react';
import $ from 'jquery';
import '../../styles/teams/AddTeam.css';
import Select from 'react-select'
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            tname: '',
            tdept: '',
            tusers: [],
            rmngr: [{ name: '', from: '', to: '' }]
        }
    }
    handleChange = (selectedOptions) => {
        this.setState({ selectedOptions })
    }
    componentDidMount() {
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
                console.log(team);
                var options = []
                team.tusers.map((val, i) => { options.push({ value: val, label: val }) })
                This.setState({ selectedOptions: options })
                Object.keys(team).map(function (key, index) {
                    if (key == 'rmngr') {
                        const val = team[key];
                        val.map((v, i) => {
                            val[i] = JSON.parse(v);
                        });
                        This.setState({ [key]: val });
                    }
                    else
                        This.setState({ [key]: team[key] });
                })
            }
        });
    }
    add = (e) => {
        e.preventDefault();
        const tusers = []
        this.state.selectedOptions.map((user, index) => { tusers.push(user.value) });
        let emn = [];
        this.state.rmngr.map((val, index) => {
            emn.push(val)
        })
        emn.map((val, index) => {
            emn[index] = JSON.stringify(val)
        })
        if (this.update) {
            const url = "/api/v1/teams/update";
            const { tname, tdept, id } = this.state;
            const body = { id, tname, tdept, tusers, rmngr: emn }
            const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(response => {
                    console.log(response);
                    this.added = true;
                    this.forceUpdate();
                })
                .catch(error => console.log(error.message));
        }
        else {
            const url = "/api/v1/teams/create";
            const { tname, tdept } = this.state;
            const body = { tname, tdept, tusers, rmngr: emn };
            console.log(body);
            const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(response => {
                    console.log(response);
                    this.added = true;
                    this.forceUpdate();
                })
                .catch(error => console.log(error.message));
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    managerHandler = (e, i) => {
        const mng = this.state.rmngr;
        var m = mng[i];
        m[e.target.name] = e.target.value;
        mng[i] = m;
        this.setState({ rmngr: mng });
    }
    addManager = () => {
        const mng = this.state.rmngr;
        mng.push({ name: '', from: '', to: '' });
        this.setState({ rmngr: mng }, () => this.forceUpdate);
    }
    removeManager = (i) => {
        var mng = []
        this.state.rmngr.map((val, i) => mng.push(val));
        mng.splice(i, 1)
        console.log(mng)
        this.setState({ rmngr: mng }, () => this.forceUpdate());
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
                                    <input className="form-control" type="text" value={this.state.tname} name='tname' onChange={this.onChangeHandler}></input>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Department Name</label>
                                    <select className="form-control" value={this.state.tdept} name='tdept' onChange={this.onChangeHandler}>
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
                                {this.state.rmngr.map((val, index) => {
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
                                                {this.state.rmngr.length > 1 ?
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