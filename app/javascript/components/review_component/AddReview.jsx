import React from 'react';
import '../../styles/Reviews/AddReview.css';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

class AddReview extends React.Component {
    update = false;
    added = false;
    constructor(props) {
        super(props);
        this.state = {
            rname: '',
            tpfrom: '',
            tpto: '',
            krd: '',
            perchk: false,
            bonlay: false,
            salrp: false,
            edoj: '',
            crpfrom: '',
            crpto: '',
            mrfrom: '',
            mrto: '',
            hodfrom: '',
            hodto: '',
            hrfrom: '',
            hrto: '',
            eopfrom: '',
            eopto: '',
        }
    }
    componentDidMount(){
        const This=this
        $(document).ready(function () {
            // var now = new Date();
            // var day = ("0" + now.getDate()).slice(-2);
            // var month = ("0" + (now.getMonth() + 1)).slice(-2);
            // var today = now.getFullYear() + "-" + (month) + "-" + (day);
            // This.setState({ tpfrom: today, tpto: today });
            if (This.props.location.state) {
                This.update = true;
                const review = This.props.location.state.review;
                console.log(review);
                Object.keys(review).map(function (key, index) {
                    This.setState({ [key]: review[key] });
                })
                This.forceUpdate()
            }
        });
    }
    onChangeHandler = (e) => {
        if (e.target.type == 'checkbox')
            this.setState({ [e.target.name]: e.target.checked });
        else
            this.setState({ [e.target.name]: e.target.value });
    }
    add = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.update) {
            const url = "/api/v1/reviews/update";
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
                    this.added = true;
                    this.forceUpdate();
                })
                .catch(error => console.log(error.message));
        }
        else {
            const url = "/api/v1/reviews/create";
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
                    this.added = true;
                    this.forceUpdate();
                })
                .catch(error => console.log(error.message));
        }
    }
    render() {
        if (this.added)
            return <Redirect to='/home/review'></Redirect>
        else
            return (
                <div className="add-review">
                    <div className="row header">
                        <h5>Add Review Periods</h5>
                    </div>
                    <br />
                    <div className="form mb-5">
                        <div className="form-group flex">
                            <label className="col-2">Name Of The Period</label>
                            <input className="form-control w50 col-4" type="text" placeholder="Enter Name of the period" value={this.state.rname} name='rname' onChange={this.onChangeHandler}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Time Period</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.tpfrom} name='tpfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.tpto} name='tpto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">KR Deadline</label>
                            <input className="form-control col-4" placeholder="Select KR Deadline" type="text" value={this.state.krd} name='krd' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <div className="col-3 just-cent">
                                <input type="checkbox" checked={this.state.perchk} name='perchk' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Performance Check</span>
                            </div>
                            <div className="col-3 just-cent">
                                <input type="checkbox" checked={this.state.bonlay} name='bonlay' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Bonus Layouts</span>
                            </div>
                            <div className="col-4 just-cent">
                                <input type="checkbox" checked={this.state.salrp} name='salrp' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Salary Revisions & Promotions</span>
                            </div>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-3">Eligibility of DOJ before</label>
                            <input className="form-control col-4" placeholder="Select Eligibility of DOJ before" type="text" value={this.state.edoj} name='edoj' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Club Reviews Periods</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.crpfrom} name='crpfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.crpto} name='crpto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Manager Reviews</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.mrfrom} name='mrfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.mrto} name='mrto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">HOD Approval Deadline</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.hodfrom} name='hodfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.hodto} name='hodto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">HR Completion</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.hrfrom} name='hrfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.hrto} name='hrto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">End Of Process</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.eopfrom} name='eopfrom' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.eopto} name='eopto' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                    </div>
                    <div className="footer">
                        <button onClick={this.add}>Save</button>
                    </div>
                </div>
            );
    }
}
export default AddReview;