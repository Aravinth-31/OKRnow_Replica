import React from 'react';
import '../../../styles/Admin/Employees/AddEmployee.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post, Interceptor, Patch ,Get} from '../../../utils/Helper';
class AddEmployee extends React.Component {
    added = false;
    update = false;
    dept = [];
    teams = [];
    masterData = { band: [], cost_center: [], desg: [], location: [] }
    constructor(props) {
        super(props);
        this.state = {
            dept: '',
            name: '',
            password: '',
            desg: '',
            band: '',
            role: '',
            code: '',
            email: '',
            mobile_no: '',
            doj: '',
            annual_salary: '',
            variable_pay: '',
            location: '',
            zone: '',
            cost: '',
            team: '',
            reporting_manager: [{ name: '', from: '', to: '' }]
        };
    }
    componentDidMount() {
        Interceptor();
        this.getDepts();
        this.getTeams();
        this.getMasterData();
        const This = this;
        $(document).ready(function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            This.setState({ doj: today });
            $('#datePicker').val(today);
            $('#date-from').val(today);

            if (This.props.location.state) {
                This.update = true;
                const emp = This.props.location.state.employee;
                console.log(emp);
                Object.keys(emp).map(function (key, index) {
                    if (key == 'reporting_manager') {
                        const val = emp[key];
                        val.map((v, i) => {
                            val[i] = JSON.parse(v);
                        });
                        if (val.length == 0)
                            val = [{ name: '', from: '', to: '' }];
                        This.setState({ [key]: val });
                    }
                    if (key == 'team')
                        This.setState({ oldteam: emp[key], [key]: emp[key] });
                    else
                        This.setState({ [key]: emp[key] });
                })
            }
        });
        $('#check').click(function () {
            $('#date-to').prop('disabled', function (i, v) {
                return !v;
            })
        })
    }
    getDepts =async () => {
        const url = "/api/v1/departments";
        try{
            const response=await Get(url);
            this.dept = response;
            this.forceUpdate();
        }catch(err){console.log(err);}
    }
    getTeams =async () => {
        const url = "/api/v1/teams";
        try{
            const response=await Get(url);
            this.teams=response;
            this.forceUpdate();
        }catch(err){console.log(err);}
    }
    getMasterData =async () => {
        const url = "/api/v1/masterdata";
        try {
            const response = await Get(url);
            this.masterData = response
            console.log(this.masterData)
            this.forceUpdate();
        } catch (err) { console.log(err); }
    }
    onChngeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    add = async (e) => {
        e.preventDefault();
        let emn = [];
        this.state.reporting_manager.map((val, index) => {
            emn.push(JSON.stringify(val))
        })
        if (this.state.team != this.state.oldteam)
            this.teamUpdate()
        this.setState({ password: this.state.name }, async function () {
            if (this.update) {
                const url = "/api/v1/employees/" + this.state.id;
                const body = { ...this.state, reporting_manager: emn };
                try {
                    const response = await Patch(url, body);
                    console.log(response);
                    this.added = true;
                    this.forceUpdate();
                } catch (err) { console.log(err); }
            }
            else {
                const url = "/api/v1/employees";
                const body = { ...this.state, reporting_manager: emn };
                try {
                    const response = await Post(url, body);
                    console.log(response);
                    if (response.id)
                        this.added = true;
                    else
                        this.setState({ dept: '', name: '', password: '', desg: '', band: '', role: '', code: '', email: '', mobile_no: '', doj: '', annual_salary: '', variable_pay: '', location: '', zone: '', cost: '', team: '', reporting_manager: [{ name: '', from: '', to: '' }] }, () => this.forceUpdate())
                    this.forceUpdate();
                } catch (err) { console.log(err); }
            }
        });
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
    teamUpdate =async () => {
        const url = "/api/v1/teams/updateByEmp";
        const { team, name, oldteam } = this.state
        const body = { name: team, user: name, oldTeam: oldteam }
        try{
            const response=await Post(url,body);
            console.log(response);
        }catch(err){console.log(err);}
    }
    render() {
        if (this.added)
            return <Redirect to='/home/employee'></Redirect>
        else
            return (
                <div className="addemp">
                    <div className="head" >
                        Enter New Employee
                    </div>
                    <br />
                    <div className="form">
                        <div className="form-group">
                            <label>Department</label>
                            <select className="form-control" value={this.state.dept} name="dept" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.dept.map((val, i) => {
                                    return <option className="form-control" value={val.name} key={i}>{val.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Employee Name</label>
                            <input className="form-control" type="text" name="name" onChange={this.onChngeHandler} value={this.state.name}></input>
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <select className="form-control" value={this.state.desg} name="desg" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.desg.map((val, i) => {
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Band</label>
                            <select className="form-control" value={this.state.band} name="band" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.band.map((val, i) => {
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select className="form-control" value={this.state.role} name="role" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                <option className="form-control" value='Super Admin'>Super Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Employee No</label>
                            <input className="form-control" type="text" name="code" value={this.state.code} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Mobile No</label>
                            <input className="form-control" type="numbers" name="mobile_no" value={this.state.mobile_no} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Date Of Joining</label>
                            <input className="form-control" type="date" id="datePicker" name="doj" value={this.state.doj} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Annual Fixed Salary(RS)</label>
                            <input className="form-control" type="numbers" name="annual_salary" value={this.state.annual_salary} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Variable Pay(RS)</label>
                            <input className="form-control" type="text" name="variable_pay" value={this.state.variable_pay} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <select className="form-control" value={this.state.location} name="location" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.location.map((val, i) => {
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Zone</label>
                            <select className="form-control" value={this.state.zone} name="zone" onChange={this.onChngeHandler}>
                                <option disabled value=""></option>
                                <option className="form-control" disabled>No options</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cost Center</label>
                            <select className="form-control" value={this.state.cost} name="cost" onChange={this.onChngeHandler}>
                                <option className="form-control" disabled value=''></option>
                                {this.masterData.cost_center.map((val, i) => {
                                    return <option className="form-control" value={val} key={i}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <select className="form-control" value={this.state.team} name="team" onChange={this.onChngeHandler}>
                                <option value="" disabled></option>
                                {this.teams.map((team, i) => {
                                    return <option className="form-control" value={team.name} key={i}>{team.name}</option>
                                })}
                                {this.teams.length == 0 ?
                                    <option className="form-control" disabled>No options</option> : null
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="rept">
                        <div className="head">
                            <h1>Reporting Manager</h1>
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
                    <div className="footer">
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}
export default AddEmployee;