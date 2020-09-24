import React from 'react';
import '../../../styles/Admin/Employees/AddEmployee.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddEmployee extends React.Component {
    added = false;
    update = false;
    dept=[];
    teams=[];
    masterData={band:[],costCent:[],desg:[],loc:[]}
    constructor(props) {
        super(props);
        this.state = {
            edept: '',
            ename: '',
            epassword: '',
            edesg: '',
            eband: '',
            erole: '',
            ecode: '',
            eemail: '',
            emno: '',
            edoj: '',
            easal: '',
            evpay: '',
            eloc: '',
            ezone: '',
            ecost: '',
            eteam: '',
            rmngr: [{ name: '', from: '', to: '' }]
        };
    }
    componentDidMount() {
        this.getDepts();
        this.getTeams();
        this.getMasterData();
        const This = this;
        $(document).ready(function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            This.setState({ edoj: today });
            $('#datePicker').val(today);
            $('#date-from').val(today);

            if (This.props.location.state) {
                This.update = true;
                const emp = This.props.location.state.employee;
                console.log(emp);
                Object.keys(emp).map(function (key, index) {
                    if (key == 'rmngr') {
                        const val = emp[key];
                        val.map((v, i) => {
                            val[i] = JSON.parse(v);
                        });
                        if(val.length==0)
                            val=[{name:'',from:'',to:''}];
                        This.setState({ [key]: val });
                    }
                    if(key=='eteam')
                        This.setState({oldteam:emp[key],[key]: emp[key]});
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
    getDepts=()=>{
        const url = "/api/v1/departments/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.dept=response;
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    getTeams=()=>{
        const url = "/api/v1/teams/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.teams=response;
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    getMasterData=()=>{
        const url = "/api/v1/masterdata/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.masterData=response
                console.log(this.masterData)
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    onChngeHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    add = (e) => {
        e.preventDefault();
        let emn = [];
        this.state.rmngr.map((val, index) => {
            emn.push(val)
        })
        emn.map((val, index) => {
            emn[index] = JSON.stringify(val)
        })
        if(this.state.eteam!=this.state.oldteam)
            this.teamUpdate()
        this.setState({ epassword: this.state.ename }, function () {
            if (this.update) {
                const url = "/api/v1/employees/update";
                const body = this.state;
                body.rmngr = emn;
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
                const url = "/api/v1/employees/create";
                const body = this.state
                body.rmngr = emn;
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
                        if(response.id)
                            this.added = true;
                        else
                            this.setState({edept: '',ename: '',epassword: '',edesg: '',eband: '',erole: '',ecode: '',eemail: '',emno: '',edoj: '',easal: '',evpay: '',eloc: '',ezone: '',ecost: '',eteam: '',rmngr: [{ name: '', from: '', to: '' }]},()=>this.forceUpdate())
                        this.forceUpdate();
                    })
                    .catch(error => console.log(error.message));
            }
        });
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
        this.setState({ rmngr: mng }, () => this.forceUpdate());
    }

    teamUpdate=()=>{
        const url = "/api/v1/teams/updateByEmp";
        const {eteam,ename,oldteam}=this.state
        const body = {tname:eteam,user:ename,oldTeam:oldteam}
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
            })
            .catch(error => console.log(error.message));
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
                            <select className="form-control" value={this.state.edept} name="edept" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.dept.map((val,i)=>{
                                    return <option className="form-control" value={val.dname} key={i}>{val.dname}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Employee Name</label>
                            <input className="form-control" type="text" name="ename" onChange={this.onChngeHandler} value={this.state.ename}></input>
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <select className="form-control" value={this.state.edesg} name="edesg" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.desg.map((val,i)=>{
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Band</label>
                            <select className="form-control" value={this.state.eband} name="eband" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.band.map((val,i)=>{
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select className="form-control" value={this.state.erole} name="erole" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                <option className="form-control" value='Super Admin'>Super Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Employee No</label>
                            <input className="form-control" type="text" name="ecode" value={this.state.ecode} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="email" name="eemail" value={this.state.eemail} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Mobile No</label>
                            <input className="form-control" type="numbers" name="emno" value={this.state.emno} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Date Of Joining</label>
                            <input className="form-control" type="date" id="datePicker" name="edoj" value={this.state.edoj} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Annual Fixed Salary(RS)</label>
                            <input className="form-control" type="numbers" name="easal" value={this.state.easal} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Variable Pay(RS)</label>
                            <input className="form-control" type="text" name="evpay" value={this.state.evpay} onChange={this.onChngeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <select className="form-control" value={this.state.eloc} name="eloc" onChange={this.onChngeHandler}>
                                <option disabled value=''></option>
                                {this.masterData.loc.map((val,i)=>{
                                    return <option className="form-control" key={i} value={val}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Zone</label>
                            <select className="form-control" value={this.state.ezone} name="ezone" onChange={this.onChngeHandler}>
                                <option disabled value=""></option>
                                <option className="form-control" disabled>No options</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cost Center</label>
                            <select className="form-control" value={this.state.ecost} name="ecost" onChange={this.onChngeHandler}>
                                <option className="form-control" disabled value=''></option>
                                {this.masterData.costCent.map((val,i)=>{
                                    return <option className="form-control" value={val} key={i}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <select className="form-control" value={this.state.eteam} name="eteam" onChange={this.onChngeHandler}>
                                <option value="" disabled></option>
                                {this.teams.map((team,i)=>{
                                    return <option className="form-control" value={team.tname} key={i}>{team.tname}</option>
                                })}
                                {this.teams.length==0?
                                    <option className="form-control" disabled>No options</option>:null
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
                    <div className="footer">
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}
export default AddEmployee;