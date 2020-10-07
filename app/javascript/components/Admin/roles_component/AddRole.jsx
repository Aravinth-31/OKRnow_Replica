import React from 'react';
import '../../../styles/Admin/Roles/AddRole.css';
import { Redirect } from 'react-router-dom';
import { Get, Post, Patch, Interceptor } from '../../../utils/Helper';

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
    async componentDidMount() {
        Interceptor();
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
            try {
                const response = await Post(url, body);
                this.setState({ roles: response }, () => {
                    console.log(this.state.roles);
                    this.forceUpdate();
                });
            } catch (err) { console.log(err); }
        }
        else {
            const url = "/api/v1/all_roles";
            try {
                const response = await Get(url);
                this.setState({ roles: response }, () => {
                    console.log(this.state.roles);
                    this.forceUpdate();
                })
            } catch (err) { console.log(err); }
        }
    }
    add = async (e) => {
        e.preventDefault();
        const { name, roles } = this.state;
        const body = { name, roles };
        let url = "/api/v1/all_roles";
        if (this.update) {
            url += "/" + this.state.id;
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