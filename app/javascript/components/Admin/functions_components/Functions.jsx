import React from 'react';
import $ from 'jquery';
import '../../../styles/Admin/Functions/Functions.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import {Get,Delete,Interceptor} from '../../../utils/Helper';

class Functions extends React.Component {
    functions = [{ name: 'Development', hod: 'Vinitha Shree' }, { name: 'Function 1', hod: 'Suresh Kumar' }];
    function = null;
    constructor(props) {
        super(props)
        this.state = {
            functions: []
        };
    }
    componentDidMount() {
        Interceptor();
        this.getData();
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('.Title').prop('title', 'Hi');
            $('.Title').prop('data-toggle', 'tooltip');
            $('.Title').prop('data-placement', 'top');
        });
    }
    getData=async ()=>{
        const url = "/api/v1/functions";
        try{
            const response=await Get(url);
            this.setState({functions:response},()=>{
                console.log(this.state.functions);
                this.forceUpdate();
            })
        }catch(err){console.log(err);}
    }
    delete =async (e) => {
        const url = "/api/v1/functions/"+e;
        try{
            const response=await Delete(url);
            console.log(response);
            this.getData();
        }catch(err){console.log(err);}
    }
    convert=(e)=>{
        var name=''
        e.map((val,i)=>{
            val=JSON.parse(val)
            if(i==0)
                name+=val.name;
            else    
                name+=', '+val.name;
        })
        return name
    }
    render() {
        if (this.function != null) {
            return <Redirect to={{ pathname: '/home/function/add', state: { function: this.function } }}></Redirect>
        }
        else
            return (
                <div className="Functions">
                    <div className="row head">
                        <div className="col col-6 title">Functions</div>
                        <div className="col col-6" style={{ justifyContent: 'flex-end' }}>
                            <button className="addfun" onClick={() => this.props.history.push('/home/function/add')}>Add New Function</button>
                        </div>
                    </div>
                    <br />
                    {this.state.functions.length > 0 ?
                        <div className="row header">
                            <div className="col col-3">Function Name</div>
                            <div className="col col-2">HOD</div>
                            <div className="col col-5"></div>
                            <div className="col col-2"></div>
                        </div> : null}
                    <div className="content">
                        {this.state.functions.length > 0 ?
                            this.state.functions.map((person, index) => (
                                <div className="row" key={index.toString()}>
                                    <div className="col col-3">{person.name}</div>
                                    <div className="col col-4">{this.convert(person.reporting_manager)}</div>
                                    <div className="col col-3 edit"><span className="Edit" onClick={() => {
                                        this.function = person;
                                        this.forceUpdate();
                                    }}><FontAwesomeIcon icon={faEdit} /></span></div>
                                    <div className="col col-2"><span className="delete" onClick={() => this.delete(person.id)}><FontAwesomeIcon icon={faTrash} /></span></div>
                                </div>
                            )) :
                            <div className="emptyFuns">
                                <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                                <h5>No Data Found</h5>
                            </div>
                        }
                    </div>
                    <br />
                    {this.functions.length > 0 ?
                        <div>
                            <div className="pages">
                                <button className="left btn btn-light">{'<'}</button>
                                <button className="num btn btn-light">1</button>
                                <button className="right btn btn-light">{'>'}</button>
                            </div>
                            <div className="goto">
                                <span>Goto</span><input className="form-control" type="numbers" name="" />
                            </div>
                        </div>
                        : null
                    }
                </div>
            );
    }
}

export default Functions;