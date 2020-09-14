import React from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  Redirect} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';  

class Login extends React.Component {
    emailflag=0;
    passwordflag=0;
    missingflag=0;
    incorrectflag=0;
    emailFlag=0;
    passwordFlag=0;
    icon=faEyeSlash;
    logged=false;
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    onChangeHandler=(e)=>{
        if(e.target.name==='username')
        this.emailFlag=1;
        if(e.target.name==='password')
        this.passwordFlag=1;
        this.setState({[e.target.name]:e.target.value},()=>{
            if(this.state.username.length>0)
                this.emailflag=0;
            else if(this.emailFlag)
                this.emailflag=1;
            if(this.state.password.length>0)
                this.passwordflag=0;
            else if(this.passwordFlag)
                this.passwordflag=1;
            if(this.state.username.length>0 && this.state.password.length>0)
                this.missingflag=0;
            this.forceUpdate()
        });
    }
    toggle=()=>{
        if(this.icon===faEye){
            this.icon=faEyeSlash;
            document.getElementById("password").setAttribute("type","password");
        }
        else{
            this.icon=faEye;
            document.getElementById("password").setAttribute("type","text");
        }
        this.forceUpdate();
    }
    signIn=(e)=>{
        e.preventDefault();
        const url = "/api/v1/login/index";
        const { username, password } = this.state;
        if(username.length==0 || password.length==0){
            if(username.length==0)
                this.emailflag=1;
            if(password.length==0)
                this.passwordflag=1;
            this.missingflag=1;
            this.forceUpdate()
        }
        else{
            const body={username,password}
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
                    const {message}=response;
                    if(response.message==='failure')
                        this.incorrectflag=1;
                    else{
                        toast.success("Logged In Successfully", { position: toast.POSITION.TOP_CENTER,closeButton:false,autoClose:1500 })
                        setTimeout(()=>{this.logged=true;this.forceUpdate()},1500)
                    }
                })
                .catch(error => console.log(error.message));
            }
    }
    render() {
        if(this.logged){
            return <Redirect to='/home/dashboard'  />
        }
        else{
            return (
                <div className="container">
                    <ToastContainer />
                    <div className="form1">
                    <div className="login-form">
                        <h2>Sign in to undefined<br/>OKR</h2>
                        <h5>please enter your credentials to proceed.</h5><br/>
                        <p className="form-group">
                            <label>Email Address</label><br/>
                            <input className="form-control" value={this.state.username} onChange={this.onChangeHandler} name="username" type="email"/>
                            {this.emailflag?
                                <span className="error">Enter the Email Address</span>:null
                            }
                        </p>
                        <p className="form-group">
                            <label>Password</label><br/>
                            <span className="input-icons">
                                <i className="eye" onClick={this.toggle}>
                                    <FontAwesomeIcon
                                        icon={this.icon}
                                    />
                                </i>
                            </span>
                            <input className="form-control" value={this.state.password} id="password" onChange={this.onChangeHandler} name="password" type="password"/>
                            {/* <i className="eye" onClick={this.toggle}>
                                <FontAwesomeIcon
                                    icon={this.icon}
                                />
                            </i> */}
                            {this.passwordflag?
                            <span className="error">Enter the Password</span>:null
                            }
                        </p>
                        <p>
                            <a href="" className="forgot-section">Forgot Password?</a>
                        </p>
                        <p className="form-group">
                        {this.missingflag?
                            <span className="error">Missing Fields . Please Fill the<br/> Details</span>:null
                        }
                        {this.incorrectflag?
                            <span className="error">Access Denied! Email or Password<br/> Incorrect</span>:null
                        }
                        
                            <button  className="form-control" onClick={this.signIn}>Sign In</button>
                        </p>
                        <br/>
                    </div>
                    <div className="login-img">
                        <img src="http://159.65.156.91/static/media/login.8bc40648.svg" alt=""/>
                    </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;