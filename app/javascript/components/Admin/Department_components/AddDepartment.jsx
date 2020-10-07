import React from 'react';
import '../../../styles/Admin/Functions/Addfunc.css';
import $ from 'jquery'
import { Redirect } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post, Interceptor,Patch } from '../../../utils/Helper';

class AddDepartment extends React.Component {
    update = false;
    added = false;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dhod: '',
            dfrom: '',
            dto: '',
            reporting_manager: [{ name: '', from: '', to: '' }]
        }
    }
    componentDidMount() {
        Interceptor();
        const This = this;
        $('#check').on('click',function () {
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
                    if (key == 'reporting_manager') {
                        const val = emp[key];
                        val.map((v, i) => {
                            val[i] = JSON.parse(v);
                        });
                        if (val.length == 0)
                            val = [{ name: '', from: '', to: '' }];
                        This.setState({ [key]: val });
                    }
                    else
                        This.setState({ [key]: emp[key] });
                })
            }
        });
    }
    add = async (e) => {
        e.preventDefault();
        let emn = [];
        this.state.reporting_manager.map((val, index) => {
            emn.push(JSON.stringify(val))
        })
        const body ={...this.state,reporting_manager:emn};
        let url = "/api/v1/departments";
        if (this.update) {
            try {
                url+='/'+body.id;
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
        mng[i][e.target.name]=e.target.value;
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
                            <input className="form-control" type="text" name="name" onChange={this.onChangeHandler} value={this.state.name}></input>
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
                                            <td className="check">
                                                <input type="checkbox" name="" id="check" /><span>Till now</span>
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
                    <div className="footer" >
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}

export default AddDepartment;