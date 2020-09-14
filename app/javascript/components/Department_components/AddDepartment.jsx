import React from 'react';
import '../../styles/Functions/Addfunc.css';
import $ from 'jquery'
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddDepartment extends React.Component {
    update = false;
    added=false;
    constructor(props) {
        super(props);
        this.state = {
            dname: '',
            dhod: '',
            dfrom: '',
            dto: '',
            rmngr: [{ name: '', from: '', to: '' }]
        }
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
            This.setState({ dfrom: today, dto: today });
            $('#datePicker').val(today);
            $('#date-from').val(today);
            if (This.props.location.state) {
                This.update = true;
                const emp = This.props.location.state.department;
                console.log(emp);
                Object.keys(emp).map(function (key, index) {
                    if(key=='rmngr'){
                        const val=emp[key];
                        val.map((v,i)=>{
                            val[i]=JSON.parse(v);
                        });
                        This.setState({ [key]: val});
                    }
                    else
                    This.setState({ [key]: emp[key] });
                })
            }
        });

    }
    add = (e) => {
        e.preventDefault();
        console.log(this.state);
        let emn=[];
        this.state.rmngr.map((val, index)=>{
            emn.push(val)
        })
        emn.map((val,index)=>{
            emn[index]=JSON.stringify(val)
        })
        if (this.update) {
            const url = "/api/v1/departments/update";
            const body = this.state
            body.rmngr=emn;
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
            const url = "/api/v1/departments/create";
            const body = this.state
            body.rmngr=emn;
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
    managerHandler=(e,i)=>{
        const mng=this.state.rmngr;
        var m=mng[i];
        m[e.target.name]=e.target.value;
        mng[i]=m;
        this.setState({rmngr:mng});
    }
    addManager=()=>{
        const mng=this.state.rmngr;
        mng.push({name:'',from:'',to:''});
        this.setState({rmngr:mng},()=>this.forceUpdate);
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
            return <Redirect to='/home/department'></Redirect>
        else
            return (
                <div className="AddFunctions">
                    <div className="head">
                        Add New Department
		            </div>
                    <br />
                    <h2>Team Users</h2>
                    <div className="form">
                        <div className="form-group">
                            <label>Department Name</label>
                            <input className="form-control" type="text" name="dname" onChange={this.onChangeHandler} value={this.state.dname}></input>
                        </div>
                    </div>
                    <br />
                    <div className="rept">
                        <div className="head">
                            <h1>HOD Details</h1>
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
                                                <select className="form-control" value={val.name} name="name" onChange={(e)=>this.managerHandler(e,index)}>
                                                    <option className="form-control" disabled value=''>Select</option>
                                                    <option className="form-control" value='Suresh Kumar'>Suresh Kumar</option>
                                                    <option className="form-control" value='Vinitha Shree'>Vinitha Shree</option>
                                                </select>
                                            </td>
                                            <td><input className="form-control" type="date" id="date-from" value={val.from} name="from"  onChange={(e)=>this.managerHandler(e,index)}></input></td>
                                            <td><input className="form-control" type="date" id="date-to" value={val.to} name="to"  onChange={(e)=>this.managerHandler(e,index)}></input></td>
                                            <td className="check">
                                                <input type="checkbox" name="" id="check" /><span>Till now</span>
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
                    <div className="footer" >
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}

export default AddDepartment;