import React from 'react'
import '../../styles/Roles/Roles.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

class Roles extends React.Component {
    role = null;
    constructor(props) {
        super(props)
        this.state = {
            roles: []
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        const url = "/api/v1/all_roles/allRoles";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.setState({ roles: response })
                console.log(this.state.roles);
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    delete = (e) => {
        const url = "/api/v1/all_roles/destroy";
        const body = { id: e }
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
                this.getData();
            })
            .catch(error => console.log(error.message));
    }
    render() {
        if (this.role != null)
            return <Redirect to={{ pathname: '/home/role/add', state: { role: this.role } }}></Redirect>
        else
            return (
                <div className="roles">
                    <div className="row header">
                        <div className="col-6 d-flex justify-content-start"><h3>Roles</h3></div>
                        <div className="col-6 d-flex justify-content-end"><button className="add" onClick={() => this.props.history.push('/home/role/add')}>Add New Role</button></div>
                    </div>
                    <br />
                    {this.state.roles.length > 0 ?
                        <div className="row roles-header">
                            <div className="col-2"><span className="title">NO</span></div>
                            <div className="col-5"><span className='title'>ROLE NAME</span></div>
                            <div className="col-3"><span className='title'>NO OF USERS</span></div>
                        </div> : null
                    }
                    {this.state.roles.length > 0 ?
                        this.state.roles.map((role, index) => {
                            return (
                                <div className="cover" key={index}>
                                    <div className="row roles-content">
                                        <div className="col-2">{index + 1}</div>
                                        <div className="col-5">{role.name}</div>
                                        <div className="col-3">{role.users}</div>
                                        <div className="col-1 edit" onClick={() => {
                                            this.role = role;
                                            this.forceUpdate();
                                        }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></div>
                                        <div className="col-1 delete" onClick={() => this.delete(role.id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></div>
                                    </div>
                                </div>
                            );
                        }) :
                        <div className="emptyRoles">
                            <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                            <h5>No Data Found</h5>
                        </div>
                    }
                    <br /><br /><br />
                    {this.state.roles.length > 0 ?
                        <div>
                            <div className="pages">
                                <button className="left btn btn-light">{'<'}</button>
                                <button className="num btn btn-light">1</button>
                                <button className="right btn btn-light">{'>'}</button>
                            </div>
                            <div className="goto">
                                <span>Goto</span><input className="form-control" type="numbers" name="" />
                            </div>
                        </div> : null
                    }
                </div>
            );
    }
}
export default Roles;