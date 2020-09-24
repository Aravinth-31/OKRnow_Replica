import React from 'react';
import '../../../styles/Admin/Roles/AddRole.css';
import { Redirect } from 'react-router-dom';

class AddRole extends React.Component {
    update = false;
    added = false;
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            name: '',
            permits: {
                employee: { read: false, create: false, update: false, delete: false, import: false, export: false },
                department: { read: false, create: false, update: false, delete: false, import: false, export: false },
                masterData: { read: false, create: false, update: false, delete: false, import: false, export: false },
                role: { read: false, create: false, update: false, delete: false, import: false, export: false },
                function: { read: false, create: false, update: false, delete: false, import: false, export: false },
                companyOKR: { read: false, create: false, update: false, delete: false, import: false, export: false },
                deptOKR: { read: false, create: false, update: false, delete: false, import: false, export: false },
                empOKR: { read: false, create: false, update: false, delete: false, import: false, export: false },
                teamOKR: { read: false, create: false, update: false, delete: false, import: false, export: false },
                team: { read: false, create: false, update: false, delete: false, import: false, export: false },
                weeklyPlan: { read: false, create: false, update: false, delete: false, import: false, export: false },
                pms: { hr: false, admin: false },
                resetPass: { reset: false }
            },
            roles: {}
        }
    }
    componentDidMount() {
        const This = this
        if (this.props.location.state) {
            this.update = true;
            const emp = this.props.location.state.role;
            console.log(emp);
            Object.keys(emp).map(function (key, index) {
                This.setState({ [key]: emp[key] });
            })
        }
        if (this.update) {
            const url = "/api/v1/all_roles/allPerms";
            const { id } = this.props.location.state.role;
            const body = { id };
            console.log(body)
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
                    this.setState({ roles: response }, () => {
                        console.log(this.state.roles);
                        this.forceUpdate();
                    })
                })
                .catch(error => console.log(error.message));
        }
        if (!this.update) {
            const url = "/api/v1/all_roles/index";
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(response => {
                    this.setState({ roles: response }, () => {
                        console.log(this.state.roles);
                        this.forceUpdate();
                    })
                })
                .catch((err) => console.log(err));
        }
    }
    add = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.update) {
            const url = "/api/v1/all_roles/update";
            const { roles, id } = this.state
            const body = { id, roles };
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
            const url = "/api/v1/all_roles/create";
            const { name, roles } = this.state;
            const body = { name, roles };
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
    handleChange = (e, k) => {
        const perms = this.state.permits;
        perms[k][e.target.value] = e.target.checked;
        this.setState({ permits: perms });
    }
    roleHandler = (e, n, i) => {
        const roles = this.state.roles
        roles[n][i].have = e.target.checked;
        this.setState({ roles: roles })
    }
    render() {
        if (this.added)
            return <Redirect to='/home/role'></Redirect>
        else
            return (
                <div className="addRole">
                    <div className="header">
                        <h3>Add New Roles</h3>
                    </div>
                    <br />
                    <div className="form d-flex">
                        <div className="form-group col-6 px-4 py-2">
                            <label className="p-2">ROLE NAME</label>
                            <input type="text" name='name' value={this.state.name} onChange={this.onChangeHandler} className="w-100 form-control border-top-0 border-left-0 border-right-0 rounded-0" placeholder="Enter Role Name" required />
                        </div>
                        <div className="form-group col-6 px-4 py-2">
                            <label className="p-2">IMPORTANT ROLE</label>
                            <select className="form-control py-0 w-100" disabled value=''>
                                <option disabled value=''>Select</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="permissions mb-4">
                        <h3 className="ml-5">Permissions</h3>
                        <br />
                        {Object.keys(this.state.roles).map((key, index) => {
                            return (
                                <div key={index}>
                                    <div className="row perm">
                                        <div className="col col-3">
                                            <span className="logo">{key.slice(0, 2)}</span>
                                            <span className='title'>{key}</span>
                                        </div>
                                        <div className="col-9 d-flex">
                                            {Object.keys(this.state.roles[key]).map((perm, i) => {
                                                return (
                                                    <div className="col-2" key={i}>
                                                        <div className="form-group d-flex align-items-center">
                                                            <input type="checkbox" value='read' checked={this.state.roles[key][perm].have} onChange={(e) => this.roleHandler(e, key, perm)}></input>
                                                            <span className="note ml-2">{perm}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <hr className="text-muted" />
                                </div>
                            );
                        })}
                        {/* <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Em</span>
                                <span className='title'>Employee</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.employee.read} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.employee.create} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.employee.update} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.employee.delete} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.employee.import} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.employee.export} onChange={(e) => this.handleChange(e, 'employee')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <label className="switch mt-1">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <span className="px-3 text-muted py-0">With Approval</span>
                            </div>
                            <div className="col-6 d-flex justify-content-start">
                                <label className="switch mt-1">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <span className="px-3 text-muted py-0">Without Approval</span>
                            </div>
                        </div>
                        <hr className="text-muted" />
                         <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">De</span>
                                <span className='title'>Department</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.department.read} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.department.create} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.department.update} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.department.delete} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.department.import} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.department.export} onChange={(e) => this.handleChange(e, 'department')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Ma</span>
                                <span className='title'>Master Data</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.masterData.read} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.masterData.create} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.masterData.update} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.masterData.delete} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.masterData.import} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.masterData.export} onChange={(e) => this.handleChange(e, 'masterData')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Ro</span>
                                <span className='title'>Role</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.role.read} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.role.create} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.role.update} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.role.delete} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.role.import} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.role.export} onChange={(e) => this.handleChange(e, 'role')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Fu</span>
                                <span className='title'>Function</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.function.read} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.function.create} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.function.update} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.function.delete} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.function.import} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.function.export} onChange={(e) => this.handleChange(e, 'function')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Co</span>
                                <span className='title'>Company OKR</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.companyOKR.read} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.companyOKR.create} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.companyOKR.update} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.companyOKR.delete} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.companyOKR.import} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.companyOKR.export} onChange={(e) => this.handleChange(e, 'companyOKR')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">De</span>
                                <span className='title'>Department OKR</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.deptOKR.read} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.deptOKR.create} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.deptOKR.update} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.deptOKR.delete} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.deptOKR.import} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.deptOKR.export} onChange={(e) => this.handleChange(e, 'deptOKR')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Em</span>
                                <span className='title'>Employee OKR</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.empOKR.read} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.empOKR.create} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.empOKR.update} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.empOKR.delete} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.empOKR.import} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.empOKR.export} onChange={(e) => this.handleChange(e, 'empOKR')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Te</span>
                                <span className='title'>Team OKR</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.teamOKR.read} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.teamOKR.create} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.teamOKR.update} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.teamOKR.delete} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.teamOKR.import} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.teamOKR.export} onChange={(e) => this.handleChange(e, 'teamOKR')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Te</span>
                                <span className='title'>Team</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.team.read} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.team.create} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.team.update} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.team.delete} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.team.import} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.team.export} onChange={(e) => this.handleChange(e, 'team')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">We</span>
                                <span className='title'>Weekly Plan</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='read' checked={this.state.permits.weeklyPlan.read} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">READ</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='create' checked={this.state.permits.weeklyPlan.create} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">CREATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='update' checked={this.state.permits.weeklyPlan.update} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">UPDATE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='delete' checked={this.state.permits.weeklyPlan.delete} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">DELETE</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='import' checked={this.state.permits.weeklyPlan.import} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">IMPORT</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='export' checked={this.state.permits.weeklyPlan.export} onChange={(e) => this.handleChange(e, 'weeklyPlan')}></input>
                                        <span className="note ml-2">EXPORT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Pm</span>
                                <span className='title'>PMS</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='hr' checked={this.state.permits.pms.hr} onChange={(e) => this.handleChange(e, 'pms')}></input>
                                        <span className="note ml-2">HR</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='admin' checked={this.state.permits.pms.admin} onChange={(e) => this.handleChange(e, 'pms')}></input>
                                        <span className="note ml-2">ADMIN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row perm">
                            <div className="col col-3">
                                <span className="logo">Re</span>
                                <span className='title'>Reset Password</span>
                            </div>
                            <div className="col-9 d-flex">
                                <div className="col-2">
                                    <div className="form-group d-flex align-items-center">
                                        <input type="checkbox" value='reset' checked={this.state.permits.resetPass.reset} onChange={(e) => this.handleChange(e, 'resetPass')}></input>
                                        <span className="note ml-2">RESET</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="text-muted" /> */}
                    </div>
                    <div className="footer">
                        <button className="save" onClick={this.add}>Save</button>
                        <button className="reset" onClick={() => window.location.reload()}>Reset</button>
                    </div>
                </div>
            );
    }
}
export default AddRole;