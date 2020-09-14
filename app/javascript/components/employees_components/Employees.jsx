import React from 'react';
import '../../styles/Employees/Employees.css';
import {Redirect} from 'react-router-dom';

class Employees extends React.Component {
    // employees = [{ ecode: '0003', ename: 'Suresh Kumar', dept: 'Front-end', desg: 'Senior Developer', repm: 'Vinitha Shree', band: 'L1', loc: 'Chennai' },
    // { ecode: '0004', ename: 'Vinitha Shree', dept: 'Back-end', desg: 'Senior Developer', repm: 'Suresh Kumar', band: 'L1', loc: 'Bangalore' }];
    // employees = [];
    employee=null;
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        };
    }
    componentDidMount() {
        const url = "/api/v1/employees/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.setState({ employees: response })
                console.log(this.state.employees);
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    delete=(e)=>{
        const url = "/api/v1/employees/destroy";
        const body={id:e}
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
                window.location.reload();
            })
            .catch(error => console.log(error.message));
    }
    change=(e)=>{
        var name=''
        e.map((val,i)=>{
            val=JSON.parse(val)
            if(i==0)
                name+=val.name;
            else    
                name+=','+val.name;
        })
        return name
    }
    render() {
        if(this.employee!=null){
            // return <AddEmployee employee={this.employee}></AddEmployee>
            return <Redirect to={{pathname:'/home/employee/add',state:{employee:this.employee}}}></Redirect>
        }
        else
            return (
                <div className="emp">
                    <div className="row head">
                        <div className="col col-5 title">Employee</div>
                        <div className="col col-2">
                            <button>Import Employees</button>
                        </div>
                        <div className="col col-2">
                            <button>Block Employees</button>
                        </div>
                        <div className="col col-3" style={{ paddingRight: '15' }}>
                            <button className="add" onClick={()=>this.props.history.push('/home/employee/add')}>Add New Employee</button>
                        </div>
                    </div>
                    <br />
                    {this.state.employees.length > 0 ?
                        <div>
                            <table>
                                <tbody>
                                    <tr style={{ background: '#F4F6FE' }}>
                                        <th>Employee Code</th>
                                        <th>Employee Name</th>
                                        <th>Department</th>
                                        <th>Designation</th>
                                        <th>Reporting Manager</th>
                                        <th>Band</th>
                                        <th>Location</th>
                                        <th></th>
                                    </tr>
                                    {this.state.employees.map((emp, index) => {
                                        return [
                                        <tr key={index}>
                                            <td>{emp.ecode}</td>
                                            <td>{emp.ename}</td>
                                            <td>{emp.edept}</td>
                                            <td>{emp.edesg}</td>
                                            <td>{this.change(emp.rmngr)}</td>
                                            <td>{emp.eband}</td>
                                            <td>{emp.eloc}</td>
                                            <td className="edit">
                                                <div className="btn-group">
                                                    <p data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-butn">...</p>
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" type="button" onClick={()=>{
                                                            this.employee=emp;
                                                            // this.props.history.push('/home/employee/add');
                                                            this.forceUpdate();
                                                        }}>Edit</button>
                                                        <button className="dropdown-item" type="button" onClick={()=>this.delete(emp.id)}> Delete</button>
                                                        <button className="dropdown-item" type="button">Set User Inactive</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>];
                                    })}
                                    {/* <tr>
                                        <td>0003</td>
                                        <td>Suresh Kumar</td>
                                        <td>Front-end</td>
                                        <td>Senior developer</td>
                                        <td>Vinitha Shree</td>
                                        <td>L1</td>
                                        <td>Chennai</td>
                                        <td className="edit">
                                            <div className="btn-group">
                                                <p data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-butn">...</p>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item" type="button">Edit</button>
                                                    <button className="dropdown-item" type="button"> Delete</button>
                                                    <button className="dropdown-item" type="button">Set User Inactive</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>*/}
                                </tbody>
                            </table>
                            <br />
                            <div className="pages">
                                <button className="left btn btn-light"> {'<'} </button>
                                <button className="num btn btn-light">1</button>
                                <button className="right btn btn-light">{'>'}</button>
                            </div>
                            <div className="goto">
                                <span>Goto</span><input className="form-control" type="numbers" name="" />
                            </div>
                        </div>
                        :
                        <div className="emptyemp">
                            <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                            <h5>No Data Found</h5>
                        </div>
                    }
                    <br />
                    {/* <div className="pages">
                        <button className="left btn btn-light"> {'<'} </button>
                        <button className="num btn btn-light">1</button>
                        <button className="right btn btn-light">{'>'}</button>
                    </div> */}
                    {/* <div className="goto">
                        <span>Goto</span><input className="form-control" type="numbers" name="" />
                    </div> */}
                </div>
            );
    }
}
export default Employees;