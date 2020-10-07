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
import { Patch, Interceptor, Get } from '../../../utils/Helper';

class MasterData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: 'band',
            band: [],
            desg: [],
            location: [],
            cost_center: [],
            measure_type: [],
            special_employee: [],
            user: 'master'
        }
    }
    componentDidMount() {
        Interceptor();
        const This = this;
        $('.navic').click(function () {
            This.setState({ component: $(this).attr('name') }, () => console.log(This.state.component));
            $(this).addClass('active').siblings().removeClass('active');
        })
        this.getData();
    }
    getData=async ()=>{
        const url = "/api/v1/masterdata";
        const This=this;
        try{
            const response=await Get(url);
            console.log(response);
            Object.keys(response).map((key, index) => {
                This.setState({ [key]: response[key] });
            })
            this.forceUpdate();
        }catch(err){console.log(err);}
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
        else if (this.state.component == 'location')
            return <Location handleChange={this.handleChange} data={this.state.location}></Location>
        else if (this.state.component == 'cost_center')
            return <CostCenter handleChange={this.handleChange} data={this.state.cost_center}></CostCenter>
        else if (this.state.component == 'measure_type')
            return <MeasureType handleChange={this.handleChange} data={this.state.measure_type}></MeasureType>
        else
            return <SpecialEmployee handleChange={this.handleChange} data={this.state.special_employee}></SpecialEmployee>
    }
    add = async (e) => {
        e.preventDefault();
        const url = "/api/v1/masterdata/"+this.state.id;
        const body = this.state;
        try {
            const response = await Patch(url, body);
            console.log(response);
            toast.success("Master Data updated", { position: toast.POSITION.TOP_CENTER, closeButton: false, autoClose: 1500 })
            setTimeout(() => { this.getData() }, 1500)
        } catch (err) { console.log(err); }
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
                        <div className='col navic' name='location'>LOCATION</div>
                        <div className='col navic' name='cost_center'>COST CENTER</div>
                        <div className='col navic' name='measure_type'>MEASURE TYPE</div>
                        <div className='col navic' name='special_employee'>SPECIAL EMPLOYEE</div>
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