import React from 'react';
import '../../../styles/Admin/MasterData/Master.css';
import Band from './Band';
import Designation from './Designation';
import Location from './Location';
import CostCenter from './CostCenter';
import MeasureType from './MeasureType';
import SpecialEmployee from './SpecialEmployee';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';  

class MasterData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: 'band',
            band: [],
            desg: [],
            loc: [],
            costCent: [],
            measType: [],
            specEmp: [],
            user: 'master'
        }
    }
    componentDidMount() {
        const This = this;
        $('.navic').click(function () {
            This.setState({ component: $(this).attr('name') }, () => console.log(This.state.component));
            $(this).addClass('active').siblings().removeClass('active');
        })
        const url = "/api/v1/masterdata/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                Object.keys(response).map((key, index) => {
                    This.setState({ [key]: response[key] });
                })
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    handleChange = (e, d, x) => {
        console.log(e, d, x);
        if (d == 'add') {
            const temp = this.state[e];
            temp.push(x);
            this.setState({ [e]: temp }, () => console.log(this.state));
        }
        else {
            var temp = this.state[e];
            const index = temp.indexOf(x);
            temp.splice(index, 1);
            this.setState({ [e]: temp }, () => console.log(this.state));
        }
    }
    rendering = () => {
        if (this.state.component == 'band')
            return <Band handleChange={this.handleChange} data={this.state.band}></Band>
        else if (this.state.component == 'desg')
            return <Designation handleChange={this.handleChange} data={this.state.desg}></Designation>
        else if (this.state.component == 'loc')
            return <Location handleChange={this.handleChange} data={this.state.loc}></Location>
        else if (this.state.component == 'costCent')
            return <CostCenter handleChange={this.handleChange} data={this.state.costCent}></CostCenter>
        else if (this.state.component == 'measType')
            return <MeasureType handleChange={this.handleChange} data={this.state.measType}></MeasureType>
        else
            return <SpecialEmployee handleChange={this.handleChange} data={this.state.specEmp}></SpecialEmployee>
    }
    add = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state));
        const url = "/api/v1/masterdata/update";
        const body = this.state
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
                toast.success("Master Data updated", { position: toast.POSITION.TOP_CENTER,closeButton:false,autoClose:1500 })
                setTimeout(()=>{this.forceUpdate()},1500)
    })
            .catch(error => console.log(error.message));
    }
    render() {
        return (
            <div className="Master">
                <ToastContainer />
                <div className="header d-flex align-items-center">
                    <h3>Master Data</h3>
                </div>
                <br /><br />
                <div className="content">
                    <div className="navi row p-2 rounded m-2">
                        <div className='col navic active' name='band'>BAND</div>
                        <div className='col navic' name='desg'>DESIGNATION</div>
                        <div className='col navic' name='loc'>LOCATION</div>
                        <div className='col navic' name='costCent'>COST CENTER</div>
                        <div className='col navic' name='measType'>MEASURE TYPE</div>
                        <div className='col navic' name='specEmp'>SPECIAL EMPLOYEE</div>
                    </div>
                    <div className='child'>
                        {
                            this.rendering()
                        }
                    </div>
                </div>
                <div className="footer" >
                    <button onClick={this.add}>Save</button>
                </div>
            </div>
        );
    }
}
export default MasterData;