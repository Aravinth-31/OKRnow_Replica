import React from 'react';
import '../../styles/ResetPassword/ResetPassword.css';
import Select from 'react-select'
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';  

class ResetPassword extends React.Component {
    customStyles = {
        control: (base, state) => ({
            ...base,
            background: 'rgb(248,248,248)',
            boxShadow: state.isFocused ? null : null,
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };
    emp = ['Vinitha Shree', 'Suresh Kumar']
    options = []
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            idlabel: '',
            enew: '',
            econfirm: ''
        };
    }
    componentDidMount() {
        const url = "/api/v1/employees/index";
        const This = this;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                response.map((emp, index) => {
                    This.options.push({ value: emp.id, label: emp.ename });
                });
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    update = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state));
        if (this.state.enew.length == 0 || this.state.econfirm.length == 0 || this.state.id.length == 0) {
            $('.error.submit').addClass('show');
            return;
        }
        else
            $('.error.submit').removeClass('show');
        if (this.state.enew != this.state.econfirm) {
            $('.error.confirm').addClass('show');
            return;
        }
        else
            $('.error.confirm').removeClass('show');
        const url = "/api/v1/employees/updatepassword";
        const { id, enew } = this.state;
        const body = { id, enew };
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
                toast.success("Password Updated", { position: toast.POSITION.TOP_CENTER,closeButton:false,autoClose:2000 });
                setTimeout(()=>window.location.reload(),1500);
            })
            .catch(error => console.log(error.message));
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    selectHandler = (e, n) => {
        this.setState({ [n]: e.value });
        this.setState({ [n + 'label']: e.label });
    }
    render() {
        return (
            <div className="reset">
                <ToastContainer />
                <h3 className="w-100 d-flex justify-content-center">Reset Password</h3>
                <p className="w-100 d-flex justify-content-center">Follow below steps to reset password</p>
                <div className="form">
                    <div className="w-100 d-flex justify-content-center">
                        <div className="form-group col-5">
                            <label>Choose Employee</label>
                            <Select options={this.options} value={this.options.filter(option => option.label === this.state.idlabel)} onChange={(e) => this.selectHandler(e, 'id')} styles={this.customStyles} className='w-100 py-0 bg' required />
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="form-group col-5">
                            <label>New Password</label>
                            <input className="form-control w-100 py-0" placeholder="New Password" name='enew' onChange={this.onChangeHandler} required></input>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="form-group col-5">
                            <label>Confirm Password</label>
                            <input className="form-control w-100 py-0" placeholder="Confirm Password" name='econfirm' onChange={this.onChangeHandler} required></input>
                            <label htmlFor="" className="error confirm pl-2">New Password And Confirm Password must be same</label>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="form-group col-5">
                            <label htmlFor="" className="error submit pl-2">Missing fields</label>
                            <button className="update w-100" onClick={this.update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;