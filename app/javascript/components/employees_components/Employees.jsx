import React from 'react';
import '../../styles/Employees/Employees.css';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

class Employees extends React.Component {
    employee = null;
    month={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}
    temp = {
        'Employee Code': 'ecode',
        'Employee Name': 'ename',
        "Date Of Joining": 'edoj',
        "Official Email": 'eemail',
        "Band": 'eband',
        "City": 'eloc',
        "Department": 'edept',
        "Department_Code": 'edcode',
        "Designation": 'edesg',
        "Function": 'efunc',
        "Team": 'eteam',
        "Team Head": 'thead',
        // "HOD L1": '',
        // "HOD L1": '',
        // "HOD L2": '',
        // "HOD L2": '',
        "CostCenter": 'ecost',
        // "CostCenter_Code": '',
        "Zone": 'ezone',
        "MobileNo": 'emno'
    }
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            filedata: []
        };
        this.getdata=this.getdata.bind(this);
    }
    componentDidMount() {
        this.getdata();
        console.log("mounting")
        const This = this
        $('.import .close').on('click', function () {
            $('.import').removeClass('show');
        })
        $('#importbtn').on('click', function () {
            $('.import').addClass('show');
        })
        $("#input").on("change", function (e) {
            var file = e.target.files[0];
            // input canceled, return
            if (!file) return;
            $('.emp .import div div.inner button').addClass('show');
            var FR = new FileReader();
            FR.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });
                var firstSheet = workbook.Sheets[workbook.SheetNames[0]];

                // header: 1 instructs xlsx to create an 'array of arrays'
                var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1,raw:false});

                // data preview
                var res = []
                result.map((val, index) => {
                    if (val.length > 0)
                        res.push(val)
                })
                console.log(res);
                This.setState({ filedata: res });
            };
            FR.readAsArrayBuffer(file);
        });
    }
    getdata=()=>{
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
    delete = (e) => {
        const url = "/api/v1/employees/destroy";
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
                this.getdata();
            })
            .catch(error => console.log(error.message));
    }
    change = (e) => {
        var name = ''
        e.map((val, i) => {
            val = JSON.parse(val)
            if (i == 0)
                name += val.name;
            else
                name += ',' + val.name;
        })
        return name
    }
    addEmp=(e)=>{
        let emn = [];
        e.rmngr.map((val, index) => {
            emn.push(val)
        })
        emn.map((val, index) => {
            emn[index] = JSON.stringify(val)
        })
        const url = "/api/v1/employees/create";
        const body = e
        body.rmngr = emn;
        body.epassword=body.ename,body.easal='',body.evpay='',body.erole='';
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
                this.getdata();
            })
            .catch(error => console.log(error.message));
    }
    addDept=(e)=>{
        const url = "/api/v1/departments/create";
        const body = e
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
            })
            .catch(error => console.log(error.message));
    }
    addTeam=(e)=>{
        const url = "/api/v1/teams/create";
        const body = e
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
            })
            .catch(error => console.log(error.message));
    }
    addFunc=(e)=>{
        const url = "/api/v1/functions/create";
        const body = e
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
            })
            .catch(error => console.log(error.message));
    }
    upload = (e) => {
        $('#input').val('');
        $('.emp .import div div.inner button').removeClass('show');
        $('.import').removeClass('show');
        e.preventDefault();
        console.log(this.state.filedata);
        const data = this.state.filedata;
        data.map((val,index)=>{
            if(index>0 && index+2<data.length){
                var obj={}
                obj['rmngr']=[]
                val.map((key,i)=>{
                    if(data[0][i]=='ReportingManager Name' && key.length>0)
                        obj['rmngr'].push({name:key,from:'',to:''});
                    if(this.temp[data[0][i]]==='edoj'){
                        const str1=key.split(" ").reverse();
                        console.log(str1)
                        if(str1.length==3){                            
                            obj[this.temp[data[0][i]]]=str1[0]+'-'+this.month[str1[1]]+'-'+str1[2];
                        }
                    }
                    else(this.temp[data[0][i]])
                        obj[this.temp[data[0][i]]]=key;                    
                });
                console.log(obj);
                // this.addEmp(obj);
                // const {edept,edcode}=obj;
                // var body={dname:edept,dcode:edcode,rmngr:[]};
                // this.addDept(body);
                // let {eteam,thead,ename}=obj;
                // const tusers=[ename]
                // body={tname:eteam,rmngr:[JSON.stringify({name:thead,from:'',to:''})],user:ename,tdept:'',tusers}
                // this.addTeam(body)
                // body={fname:obj.efunc,rmngr:[JSON.stringify({name:obj.ename,from:'',to:''})]}
                // this.addFunc(body);
            }
        })
    }
    render() {
        if (this.employee != null) {
            return <Redirect to={{ pathname: '/home/employee/add', state: { employee: this.employee } }}></Redirect>
        }
        else
            return (
                <div className="emp">
                    <div className="row head">
                        <div className="col col-5 title">Employee</div>
                        <div className="col col-2">
                            <button id='importbtn'>Import Employees</button>
                        </div>
                        <div className="col col-2">
                            <button>Block Employees</button>
                        </div>
                        <div className="col col-3" style={{ paddingRight: '15' }}>
                            <button className="add" onClick={() => this.props.history.push('/home/employee/add')}>Add New Employee</button>
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
                                                            <button className="dropdown-item" type="button" onClick={() => {
                                                                this.employee = emp;
                                                                // this.props.history.push('/home/employee/add');
                                                                this.forceUpdate();
                                                            }}>Edit</button>
                                                            <button className="dropdown-item" type="button" onClick={() => this.delete(emp.id)}> Delete</button>
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
                    <div className='import'>
                        <div className='outer'>
                            <div className="close text-body">X</div>
                            <br />
                            <div className='inner'>
                                <h5>Upload Employee</h5>
                                <br /><br />
                                <div className='d-flex justify-content-center'>
                                    <input type="file" id="input" accept=".xls,.xlsx,.ods" />
                                </div>
                                <pre id="result"></pre>
                                <br /><br />
                                <div>
                                    <a className='mr-4' href="https://drive.google.com/uc?id=161A4woi3z9fZkd5BOrJxRLfB8lvbykMh&export=download" download>
                                        <button>Sample Template</button>
                                    </a>
                                    <button className='ml-5' id='upload' onClick={this.upload}>Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}
export default Employees;