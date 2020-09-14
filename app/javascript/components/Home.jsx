import React from 'react';
import '../styles/home.css';
import $ from 'jquery';
import Dashboard from "../components/Dashboard";
import Employee from "./employees_components/Employee";
import Function from "./functions_components/Function";
import Department from "./Department_components/Department";
import Team from "./teams_components/Team";
import Review from "./review_component/Review";
import ResetPassword from './Reset_Password_components/ResetPassword';
import Role from './roles_component/Role';
import MasterData from './masterdata_components/MasterData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faCaretDown, faTachometerAlt, faThumbsUp, faBullseye, faTasks, faObjectGroup, faHandshake, faHistory, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class Home extends React.Component {
    set = () => {
        document.getElementById('body').style.marginLeft = $('.sidebar').width() + 'px';
        document.getElementById('body').style.width = $('html').width() - $('.sidebar').width() + 'px'
        document.getElementById('body').style.marginTop = $('.nav').height() + 'px';
    }
    componentDidMount() {
        var fun = this.set
        $(window).resize(function () {
            fun();
        })
        $(document).ready(function () {
            fun();
        })
        $('.sidebar ul li').click(function () {
            if ($('.icon-item').hasClass('show')) {
                $('.icon-item').toggleClass('show');
            }
            fun();
        })
        $('.btn1').click(function () {
            $('.icon-item').toggleClass('show');
            $('nav ul .serv-show').removeClass("show1");
            $('nav ul .feat-show').removeClass("show");
            fun();
        });
        // $(window).click(function(){
        //     alert(JSON.stringify($('feat-btn').parent().hasClass('parentLi')));
        //     if($('feat-btn').parent().hasClass('show')){
        //         alert('hi');
        //     }
        //     alert('win');
        // });
        $('nav ul li').click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
        $('.feat-btn').click(function () {
            $('nav ul .feat-show').toggleClass("show");
        });
        $('.serv-btn').click(function () {
            $('nav ul .serv-show').toggleClass("show1");
        });
        $('.nav-right').click(function () {
            $('.not').toggleClass("show")
        })
        $('.profile-sm,.profile .close').click(function () {
            $('.profile').toggle(300);
        })
    }
    redirect = (path) => {
        this.props.history.push('/home/' + path + '/');
        console.log('redirect');
    }
    render() {
        return (
            <div className="home">
                <div className="body" id="body">
                    <Switch>
                        <Route path="/home/dashboard" component={Dashboard} />
                        <Route path="/home/employee" component={Employee} />
                        <Route path="/home/function" component={Function} />
                        <Route path="/home/department" component={Department} />
                        <Route path="/home/team" component={Team} />
                        <Route path="/home/review" component={Review} />
                        <Route path="/home/resetpassword" component={ResetPassword} />
                        <Route path="/home/role" component={Role} />
                        <Route path="/home/masterdata" component={MasterData} />
                    </Switch>
                </div>
                <nav className="sidebar">
                    <ul>
                        <li><Link to="/home/dashboard" style={{ textDecoration: 'none' }}> <div><span className="icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>
                            <span className="icon-item"> Dashboard</span></div></Link>
                        </li>
                        <li className='parentLi'>
                            <div className="feat-btn" style={{ marginLeft: '38px' }}><span className="icon"><FontAwesomeIcon icon={faUser} /></span><span className="icon-item">Admin</span></div>
                            <ul className="feat-show">
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/employee"><div><span>Employee</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/function"><div><span>Function</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/department"><div><span>Department</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/team"><div><span>Team</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/role"><div><span>Roles & Permission</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/masterdata"><div><span>Master Data</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/review"><div><span>Review Periods</span></div></Link></li>
                                <li><Link style={{ textDecoration: 'none', margin: '0' }} to="/home/resetpassword"><div><span>Reset Password</span></div></Link></li>
                            </ul>
                        </li>
                        <li className='parentLi'>
                            <div className="serv-btn" style={{ marginLeft: '38px' }}><span className="icon"><FontAwesomeIcon icon={faThumbsUp} /></span><span className="icon-item">Approvals</span></div>
                            <ul className="serv-show">
                                <li>SuperAdmin Approvals</li>
                                <li>Manager Approvals</li>
                                <li>Admin Approvals</li>
                            </ul>
                        </li>
                        <li><span className="icon"><FontAwesomeIcon icon={faBullseye} /></span><span className="icon-item">Objectives</span></li>
                        <li><span className="icon"><FontAwesomeIcon icon={faObjectGroup} /></span><span className="icon-item">Overview</span></li>
                        <li><span className="icon"><FontAwesomeIcon icon={faTasks} /></span><span className="icon-item">Weekly Plans</span></li>
                        <li><span className="icon"><FontAwesomeIcon icon={faHandshake} /></span><span className="icon-item">Colaborative Dashboard</span></li>
                        <li><span className="icon"><FontAwesomeIcon icon={faHistory} /></span><span className="icon-item">PMS</span></li>
                        <li><span className="icon"><FontAwesomeIcon icon={faAddressBook} /></span><span className="icon-item">Log Details</span></li>
                    </ul>
                </nav>
                <div className="profile">
                    <div className="close">X</div>
                    <div className="data">
                        <div className="profile-data"><img src="" /></div>
                        <div className="profile-data"><p className="name">Name Of User</p></div>
                        <div className="profile-data"><p className="role">Role of</p></div>
                    </div>
                    <div className="opacity"><hr /></div>
                    <div className="details">
                        <div className="right">Back-end</div><div className="left">Department</div>
                        <div className="right">Senior Developer</div><div className="left">Role</div>
                        <div className="right">Suresh Kumar</div><div className="left">Reporting Manager</div>
                    </div>
                    <div className="opacity"><hr /></div>
                    <div className="noti">
                        <label className="switch" style={{ float: "right" }}>
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <div className="left">System Notifications</div>
                        <label className="switch" style={{ float: "right" }}>
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <div className="left">Email Notifications</div>
                    </div>
                    <div className="logout">
                        <button id="logout" onClick={() => this.props.history.push('/')}>logout</button>
                    </div>
                </div>
                <div className="nav">
                    <ul>
                        <li className="btn1">
                            <span><FontAwesomeIcon icon={faBars} /></span>
                        </li>
                        <li>
                            <a href="">
                                <h1>OKR<span>now.</span></h1>
                            </a>
                        </li>
                    </ul>
                    <div className="nav-right">
                        <i className="fa fa-bell bell"></i><span className="bell-down"><FontAwesomeIcon icon={faCaretDown} /></span>
                    </div>
                    <div className="profile-sm">
                        <img src="" />
                        <div className="profile-sm-data">
                            <p className="name" style={{ margin: 0 }}>Name</p>
                            <p className="role">Role</p>
                        </div><span className="bell-down"><FontAwesomeIcon icon={faCaretDown} /></span>
                    </div>
                </div>
                <div className="not">
                    <div className="triangle-up"></div>
                    <div className="notifications">
                        <p className="title">Notifications</p>
                        <hr />
                        <div className="content">
                            <p>You have covered All</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;