import React from 'react';
import '../../styles/Objectives/CompanyObj.css';
import Select from 'react-select'
import { faPlusCircle, faCommentAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import $ from 'jquery';
import { passCsrfToken, Post, onChangeHandler, Interceptor } from '../../utils/Helper';
import axios from 'axios';

class EmployeeObj extends React.Component {
    optionQty = [
        { value: 'more', label: 'More' },
        { value: 'less', label: 'Less' }
    ]
    optionQua = [
        { value: 'q1', label: 'Q1' },
        { value: 'q2', label: 'Q2' },
    ]
    optionEmp = [
        { value: 'Front-end', label: 'Front-end' },
        { value: 'Back-end', label: 'Back-end' },
        { value: 'Human-resources', label: 'Human-resources' },
    ]
    quadrant = 'Q1'
    id = 0
    constructor(props) {
        super(props)
        this.state = {
            objectives: [],
            keyresults: [],
            newObjName: '',
            newObjDesc: '',
            newKeyName: '',
            newKeyDesc: '',
            editObjid: 0,
            editObjname: '',
            editKrname: '',
            editKrid: 0,
            editKrpercent: '%',
            editKrdue: ''
        }
    }
    componentDidMount() {
        passCsrfToken(document);
        // Interceptor(document,axios);
        this.getObjectives();
        const This = this;
        $('#addObjBtn').click(function () {
            $('.AddObj').addClass('show');
        })
        $('.AddObj .close').click(function () {
            This.setState({ newObjDesc: '', newObjName: '' })
            $('.AddObj').removeClass('show')
        })
        $('#addKeyBtn').click(function () {
            $('.AddKey').addClass('show');
        })
        $('.AddKey .close').on('click', function () {
            This.setState({ newKeyDesc: '', newKeyName: '' })
            $('.AddKey').removeClass('show')
        })
        $('#addIniBtn').click(function () {
            $('.AddIni').addClass('show');
        })
        $('.AddIni .close').on('click', function () {
            This.setState({ newKeyDesc: '', newKeyName: '' })
            $('.AddIni').removeClass('show')
        })
        $('.editObj .close,.editObj .cancel').click(function () {
            This.setState({ editObjid: 0, editObjname: '' });
            $('.editObj').removeClass('show');
        })
        $('.editKr .navig li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.editKr .content .' + $(this).attr('name')).addClass('show').siblings().removeClass('show')
        })
        $('.editKr .close,.editKr .cancel').on('click', function () {
            This.setState({ editKrid: 0, editKrname: '', editKrpercent: '%', editKrdue: '' });
            $('.editKr').removeClass('show');
        })
    }
    getObjectives = () => {
        const url = "/api/v2/emp_obj/empObjectives";
        const body = { quadrant: this.quadrant }
        Post(url, body)
            .then(response => {
                if (response.length > 0 && this.id == 0)
                    this.id = response[0].id
                this.setState({ objectives: response }, () => {
                    console.log(this.state.objectives);
                    this.forceUpdate();
                })
                this.getKeyresults();
            })
            .catch((err) => console.log(err));
    }
    getKeyresults = () => {
        const url = "/api/v2/emp_obj/keys";
        const body = { id: this.id }
        Post(url, body)
            .then(response => {
                this.setState({ keyresults: response }, () => {
                    console.log('kr-', this.state.keyresults)
                    this.forceUpdate()
                })
            })
            .catch((err) => console.log(err));
    }
    changeObj = (id) => {
        if (this.id != id) {
            this.id = id;
            this.getKeyresults();
        }
    }
    Add = (e, flag) => {
        e.preventDefault();
        let url = '';
        let body = {};
        if (flag === 'obj') {
            url = '/api/v2/emp_obj/addEmpObjective'
            body = { name: this.state.newObjName, desc: this.state.newObjDesc, quadrant: this.quadrant }
            this.setState({ newObjDesc: '', newObjName: '' }, () => $('.AddObj').removeClass('show'));
        }
        else {
            url = '/api/v2/emp_obj/addKeys'
            body = { name: this.state.newKeyName, desc: this.state.newKeyDesc, id: this.id };
            if (flag === 'kr')
                body['iskey'] = true;
            else
                body['iskey'] = false;
            this.setState({ newKeyDesc: '', newKeyName: '' }, () => $('.AddKey,.AddIni').removeClass('show'));
        }
        Post(url, body)
            .then(response => {
                console.log(response);
                this.getObjectives();
            })
            .catch(err => console.log(err));
    }
    delete = (id, opt) => {
        let url = '';
        if (opt === 'obj')
            url = '/api/v2/dept_obj/deleteDeptObj';
        else
            url = '/api/v2/dept_obj/deleteDeptKr_It';
        const body = { id };
        Post(url, body)
            .then(response => {
                console.log(response);
                this.getObjectives();
            })
            .catch(err => console.log(err));
    }
    edit = (e, flag) => {
        e.preventDefault();
        let url = '';
        let body = {}
        if (flag === 'obj') {
            url = '/api/v2/dept_obj/editDeptObj';
            body = { id: this.state.editObjid, name: this.state.editObjname };
        }
        else {
            url = '/api/v2/dept_obj/editDeptKr_It';
            body = { id: this.state.editKrid, name: this.state.editKrname, percent: this.state.editKrpercent, due: this.state.editKrdue };
        }
        Post(url, body)
            .then(response => {
                console.log(response);
                if (flag === 'obj')
                    this.setState({ editObjid: 0, editObjname: '' }, () => $('.editObj').removeClass('show'));
                else
                    this.setState({ editKrid: 0, editKrname: '', editKrdue: '', editKrpercent: '%' }, () => $('.editKr').removeClass('show'));
                this.getObjectives();
            }).catch(err => console.log(err));
    }
    render() {
        return (
            <div className="EmployeeObj Obj">
                <div className='header row'>
                    <div className='col-4 d-flex align-items-center'>
                        <div className='float-left'><h5>Employee Objectives</h5></div>
                    </div>
                    <div className='col-8 d-flex align-items-center justify-content-end'>
                        <span>Showing Results Of</span>
                        <Select
                            options={this.optionEmp}
                            className='col-4'
                        />
                        <Select
                            options={this.optionQua}
                            className='col-2'
                        />
                        <Select
                            options={this.optionQty}
                            className='col-2'
                        />
                    </div>
                </div>
                <br />
                <div className='content row'>
                    <div className='col-5'><h4>Objectives</h4></div>
                    <div className='col-7'><h4>Key Results & Initiatives</h4></div>
                    <div className='col-5 ob'>
                        {this.state.objectives.map((obj, index) => {
                            return (
                                <div className='obj' key={index} onClick={() => this.changeObj(obj.id)}>
                                    <div className='row'>
                                        <div className='col-7 cont'>
                                            <span className='logo'>OB</span>
                                            <span className='title pl-4'>{obj.name}</span>
                                        </div>
                                        <div className='col-4 d-flex justify-content-end circle'>
                                            <CircularProgressbar
                                                value={Math.round(obj.percent)}
                                                className='objPro'
                                                text={`${Math.round(obj.percent)}%`}
                                                styles={buildStyles({
                                                    rotation: 0.25, textSize: '25px', pathTransitionDuration: 0.5, pathColor: `#ff8095`, textColor: '#f88', trailColor: '#d6d6d6',
                                                })}
                                            />
                                        </div>
                                        <div className='col-1 d-flex align-items-center justify-content-center'>
                                            <div className="btn-group">
                                                <p data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-butn"><FontAwesomeIcon icon={faEllipsisV} /></p>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item" type="button" onClick={() => {
                                                        this.setState({ editObjid: obj.id, editObjname: obj.name }, () => $('.editObj').addClass('show'));
                                                    }}>Edit Objective</button>
                                                    <button className="dropdown-item" type="button">Assign To</button>
                                                    <button className="dropdown-item" type="button">Set High Priority</button>
                                                    <button className="dropdown-item" type="button" onClick={() => this.delete(obj.id, 'obj')}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className='footer col-6'>
                            <button id='addObjBtn'><FontAwesomeIcon icon={faPlusCircle} /><span className='pl-2'>Add Objective</span></button>
                        </div>
                    </div>
                    <div className='col-7 kr'>
                        {this.state.keyresults.length > 0 ?
                            this.state.keyresults.map((key, index) => {
                                return (
                                    <div key={index}>
                                        <div className='key row d-flex align-items-center'>
                                            <div className='col-8'>
                                                <span className='logo mx-2'>{key.iskey ? "KR" : "IT"}</span>
                                                <span className='title'>{key.iskey ? "KR" : "IT"}-{key.name}</span>
                                            </div>
                                            <div className='col-2'>
                                                <CircularProgressbar
                                                    value={Math.round(key.percent)}
                                                    className='krPro'
                                                    text={`${Math.round(key.percent) + key.meastype}`}
                                                    styles={buildStyles({
                                                        rotation: 0.25, textSize: '25px', pathTransitionDuration: 0.5, pathColor: `#ff8095`, textColor: '#f88', trailColor: '#d6d6d6',
                                                    })}
                                                />
                                            </div>
                                            <div className='col-2'>
                                                <FontAwesomeIcon icon={faCommentAlt} />
                                                <div className="btn-group pl-3">
                                                    <p data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-butn"><FontAwesomeIcon icon={faEllipsisV} /></p>
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" type="button" onClick={() => {
                                                            this.setState({ editKrid: key.id, editKrname: key.name ,iskey:key.iskey}, () => $('.editKr').addClass('show'));
                                                        }}>Edit KR</button>
                                                        <button className="dropdown-item" type="button">Set Due Date</button>
                                                        <button className="dropdown-item" type="button">Change Quarter</button>
                                                        <button className="dropdown-item" type="button">Set High Priority</button>
                                                        <button className="dropdown-item" type="button">Send For Approval</button>
                                                        <button className="dropdown-item" type="button" onClick={() => this.delete(key.id, 'key')}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='text-muted'></hr>
                                    </div>
                                )
                            }) :
                            <div className='px-3'>
                                <p className='px-2 pt-3 pb-1'>No Key Found for this Objective</p>
                                <hr />
                            </div>
                        }
                        <div className='footer'>
                            <button id='addKeyBtn' className='mr-2'>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <span className='px-2'>Add Key Results</span>
                            </button>
                            <button id='addIniBtn' className='ml-2'>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <span className='px-2'>Add Initiative</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='AddObj'>
                    <div className='form'>
                        <span className='close'>X</span>
                        <h6>Add Objective</h6>
                        <p>
                            <label>TITLE OF OBJECTIVE</label><br />
                            <input type='text' placeholder='Title goes here...' className='form-control' name='newObjName' value={this.state.newObjName} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p>
                            <label>SHORT DESCRIPTION</label><br />
                            <input type='text' placeholder='Description goes here...' className='form-control' name='newObjDesc' value={this.state.newObjDesc} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p className='pt-2 pb-4 px-2'>
                            <button onClick={(e) => this.Add(e, 'obj')}>Save</button>
                        </p>
                    </div>
                </div>
                <div className='AddKey'>
                    <div className='form' style={{ marginLeft: '-5%' }}>
                        <span className='close'>X</span>
                        <h6>Add Key Result</h6>
                        <p>
                            <label>TITLE OF KEYRESULT</label><br />
                            <input type='text' placeholder='Title goes here...' className='form-control' name='newKeyName' value={this.state.newKeyName} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p>
                            <label>SHORT DESCRIPTION</label><br />
                            <input type='text' placeholder='Description goes here...' className='form-control' name='newKeyDesc' value={this.state.newKeyDesc} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p className='pt-2 pb-4 px-2'>
                            <button onClick={(e) => this.Add(e, 'kr')}>Save</button>
                        </p>
                    </div>
                </div>
                <div className='AddIni'>
                    <div className='form' style={{ marginLeft: '+5%' }}>
                        <span className='close'>X</span>
                        <h6>Add Initiative</h6>
                        <p>
                            <label>TITLE OF INITIATIVE</label><br />
                            <input type='text' placeholder='Title goes here...' className='form-control' name='newKeyName' value={this.state.newKeyName} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p>
                            <label>SHORT DESCRIPTION</label><br />
                            <input type='text' placeholder='Description goes here...' className='form-control' name='newKeyDesc' value={this.state.newKeyDesc} onChange={(e) => onChangeHandler(e, this)} />
                        </p>
                        <p className='pt-2 pb-4 px-2'>
                            <button onClick={(e) => this.Add(e, 'ini')}>Save</button>
                        </p>
                    </div>
                </div>
                <div className='editObj'>
                    <div className='body'>
                        <div className='form'>
                            <div className='close'>X</div><br />
                            <form>
                                <h4>Edit Objective</h4><br />
                                <div>
                                    <label className='label'>Edit Name For Objective</label>
                                    <input type='text' className='form-control' name='editObjname' value={this.state.editObjname} onChange={(e) => onChangeHandler(e, this)}></input>
                                </div>
                                <div className='row'>
                                    <div className='col-6 d-flex justify-content-end align-items-center'>
                                        <p className='cancel'>Cancel</p>
                                    </div>
                                    <div className='col-6 d-flex justify-content-center'>
                                        <button className='save' onClick={(e) => this.edit(e, 'obj')}>Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='editKr'>
                    <div className='form'>
                        <div className='close btn px-0 mx-0'>X</div>
                        <br />
                        <h5>Edit {this.state.iskey?"Key Result":"Initiative"}</h5>
                        <ul className='navig'>
                            <li name='li1' className='active'>Name</li>
                            <li name='li2'>Metrices</li>
                            <li name='li3'>Due Date</li>
                        </ul>
                        <div className='content'>
                            <div className='li1 div show'>
                                <div>
                                    <label className='label'>Edit Name For {this.state.iskey?"Key Result":"Initiative"}</label>
                                    <input className='form-control' name='editKrname' value={this.state.editKrname} onChange={(e) => onChangeHandler(e, this)}></input>
                                </div>
                            </div>
                            <div className='li2 div'>
                                <div>
                                    <label className='label'>Edit Metrices For {this.state.iskey?"Key Result":"Initiative"}</label><br />
                                    <label className='label'>Measure Type</label>
                                    <select className='form-control p-0' name='editKrpercent' value={this.state.editKrpercent} onChange={(e) => onChangeHandler(e, this)}>
                                        <option value="%">%</option>
                                        <option value="VB">VB</option>
                                    </select>
                                    <label className='label'>Min Value</label>
                                    <input className='form-control' value='0' disabled></input>
                                    <label className='label'>Max Value</label>
                                    <input className='form-control' value='100' disabled></input>
                                </div>
                            </div>
                            <div className='li3 div'>
                                <div>
                                    <label className='label'>Edit Due Date For {this.state.iskey?"Key Result":"Initiative"}</label>
                                    <input className='form-control' type='date' name='editKrdue' value={this.state.editKrdue} onChange={(e) => onChangeHandler(e, this)}></input>
                                </div>
                            </div>
                        </div>
                        <div className='row py-4'>
                            <div className='col-6 d-flex justify-content-end align-items-center'>
                                <p className='cancel'>Cancel</p>
                            </div>
                            <div className='col-6 d-flex justify-content-center'>
                                <button className='save' onClick={(e) => this.edit(e, 'kr')}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeObj;