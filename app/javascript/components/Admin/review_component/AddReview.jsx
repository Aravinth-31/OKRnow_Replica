import React from 'react';
import '../../../styles/Admin/Reviews/AddReview.css';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import {Post,Interceptor,Patch} from '../../../utils/Helper';

class AddReview extends React.Component {
    update = false;
    added = false;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time_period_from: '',
            time_period_to: '',
            kr_deadline: '',
            performance_check: false,
            bonus_layouts: false,
            salary_revisions_and_promotions: false,
            elligibility_of_doj_before: '',
            club_review_period_from: '',
            club_review_period_to: '',
            manager_reviews_from: '',
            manager_reviews_to: '',
            hod_approval_deadline_from: '',
            hod_approval_deadline_to: '',
            hr_completion_from: '',
            hr_completion_to: '',
            end_of_process_from: '',
            end_of_process_to: '',
        }
    }
    componentDidMount(){
        Interceptor();
        const This=this
        $(document).ready(function () {
            // var now = new Date();
            // var day = ("0" + now.getDate()).slice(-2);
            // var month = ("0" + (now.getMonth() + 1)).slice(-2);
            // var today = now.getFullYear() + "-" + (month) + "-" + (day);
            // This.setState({ time_period_from: today, time_period_to: today });
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
    add =async (e) => {
        e.preventDefault();
        let url = "/api/v1/reviews";
        const body = this.state;
        if (this.update) {
            try{
                url+='/'+body.id;
                const response=await Patch(url,body);
                console.log(response);
                this.added=true;
                this.forceUpdate();
            }catch(err){console.log(err);}
        }
        else {
            try{
                const response=await Post(url,body);
                console.log(response);
                this.added=true;
                this.forceUpdate();
            }catch(err){console.log(err);}
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
                            <input className="form-control w50 col-4" type="text" placeholder="Enter Name of the period" value={this.state.name} name='name' onChange={this.onChangeHandler}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Time Period</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.time_period_from} name='time_period_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.time_period_to} name='time_period_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">KR Deadline</label>
                            <input className="form-control col-4" placeholder="Select KR Deadline" type="text" value={this.state.kr_deadline} name='kr_deadline' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <div className="col-3 just-cent">
                                <input type="checkbox" checked={this.state.performance_check} name='performance_check' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Performance Check</span>
                            </div>
                            <div className="col-3 just-cent">
                                <input type="checkbox" checked={this.state.bonus_layouts} name='bonus_layouts' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Bonus Layouts</span>
                            </div>
                            <div className="col-4 just-cent">
                                <input type="checkbox" checked={this.state.salary_revisions_and_promotions} name='salary_revisions_and_promotions' onChange={this.onChangeHandler} /><span className="px-2 text-secondary">Salary Revisions & Promotions</span>
                            </div>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-3">Eligibility of DOJ before</label>
                            <input className="form-control col-4" placeholder="Select Eligibility of DOJ before" type="text" value={this.state.elligibility_of_doj_before} name='elligibility_of_doj_before' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Club Reviews Periods</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.club_review_period_from} name='club_review_period_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.club_review_period_to} name='club_review_period_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">Manager Reviews</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.manager_reviews_from} name='manager_reviews_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.manager_reviews_to} name='manager_reviews_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">HOD Approval Deadline</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.hod_approval_deadline_from} name='hod_approval_deadline_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.hod_approval_deadline_to} name='hod_approval_deadline_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">HR Completion</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.hr_completion_from} name='hr_completion_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.hr_completion_to} name='hr_completion_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                        </div>
                        <br />
                        <div className="form-group flex">
                            <label className="col-2">End Of Process</label>
                            <input className="form-control col-4" placeholder="Select From Date" type="text" value={this.state.end_of_process_from} name='end_of_process_from' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
                            <div className="col-1"></div>
                            <input className="form-control col-4" placeholder="Select To Date" type="text" value={this.state.end_of_process_to} name='end_of_process_to' onChange={this.onChangeHandler} onFocus={(e) => e.target.type = 'date'}></input>
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