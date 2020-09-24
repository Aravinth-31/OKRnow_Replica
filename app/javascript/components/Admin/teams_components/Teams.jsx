import React from 'react';
import '../../../styles/Admin/teams/Teams.css';
import { faEdit, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

class Teams extends React.Component {
    team = null;
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData=()=>{
        const url = "/api/v1/teams/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.setState({ teams: response }, () => {
                    console.log(this.state.teams);
                    this.forceUpdate();
                });
            })
            .catch((err) => console.log(err));
    }
    delete = (e) => {
        const url = "/api/v1/teams/destroy";
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
        if (this.team != null) {
            // return <AddEmployee employee={this.employee}></AddEmployee>
            return <Redirect to={{ pathname: '/home/team/add', state: { team: this.team } }}></Redirect>
        }
        else
            return (
                <div className='teams'>
                    <div className="row thead">
                        <div className="col-6">
                            <h3 className="title">Teams</h3>
                        </div>
                        <div className="col-6 add-field">
                            <button className="add" onClick={() => this.props.history.push('/home/team/add')}>Add New Team</button>
                        </div>
                    </div>
                    <br />
                    {this.state.teams.length > 0 ?
                        <div className="row teams-header">
                            <div className="col col-1"><span className='title'>NO</span></div>
                            <div className="col col-2"><span className='title'>TEAM NAME</span><div className="arrows">
                                <div className="up"><span><FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon></span></div>
                                <div className="down"><span><FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon></span></div>
                            </div></div>
                            <div className="col col-2"><span className='title'>DEPARTMENT</span><div className="arrows">
                                <div className="up"><span><FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon></span></div>
                                <div className="down"><span><FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon></span></div>
                            </div></div>
                            <div className="col col-3"><span className='title'>TEAM MANAGER</span><div className="arrows">
                                <div className="up"><span><FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon></span></div>
                                <div className="down"><span><FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon></span></div>
                            </div></div>
                            <div className="col col-4"><span className='title'>EMPLOYEES COUNT</span></div>
                        </div> : null}
                    {this.state.teams.length > 0 ?
                        this.state.teams.map((team, index) => {
                            return (
                                <div className="tcontents" key={index}>
                                    <div className="row teams-content">
                                        <div className="col-1">{index + 1}</div>
                                        <div className="col-2">{team.tname}</div>
                                        <div className="col-2">{team.tdept}</div>
                                        <div className="col-3">{this.change(team.rmngr)}</div>
                                        <div className="col-2">{team.tusers.length}</div>
                                        <div className="col-1 edit"><span onClick={() => {
                                            this.team = team;
                                            this.forceUpdate();
                                        }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></span></div>
                                        <div className="col-1 delete"><span onClick={() => this.delete(team.id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span></div>
                                    </div>
                                </div>
                            );
                        }) :
                        <div className="teamFuns">
                            <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                            <h5>No Data Found</h5>
                        </div>
                    }
                    <br /><br />
                    <br />
                    {this.state.teams.length > 0 ?
                        <div>
                            <div className="pages">
                                <button className="left btn btn-light">{'<'}</button>
                                <button className="num btn btn-light">1</button>
                                <button className="right btn btn-light">{'>'}</button>
                            </div>
                            <div className="goto">
                                <span>Goto</span><input className="form-control" type="numbers" name="" />
                            </div>
                        </div> : null}
                </div>
            );
    }
}

export default Teams;