import React from 'react';
import '../../../styles/Admin/Reviews/Reviews.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { Get,Delete,Interceptor } from '../../../utils/Helper';

class Reviews extends React.Component {
    review = null;
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        };
    }
    delete =async (e) => {
        const url = "/api/v1/reviews/"+e;
        try{
            const response=await Delete(url);
            console.log(response);
            this.getData();
        }catch(err){console.log(response);}
    }
    componentDidMount() {
        Interceptor();
        this.getData();
    }
    getData = async () => {
        const url = "/api/v1/reviews";
        try {
            const response = await Get(url);
            this.setState({ reviews: response }, () => {
                console.log(this.state.reviews);
                this.forceUpdate();
            })
        } catch (err) { console.log(err); }
    }
    render() {
        if (this.review != null)
            return <Redirect to={{ pathname: '/home/review/add', state: { review: this.review } }}></Redirect>
        return (
            <div className="reviews">
                <div className="row header">
                    <div className="col-6 left"><h5>Review Periods</h5></div>
                    <div className="col-6 right"><button onClick={() => this.props.history.push('/home/review/add')}>Add New Review Period</button></div>
                </div>
                <br />
                {this.state.reviews.length > 0 ?
                    <div className="row content-header">
                        <div className="col-1"><span className="title">NO</span></div>
                        <div className="col-3"><span className='title'>NAME</span></div>
                        <div className="col-3"><span className='title'>FROM DATE</span></div>
                        <div className="col-5"><span className='title'>TO DATE</span></div>
                    </div> : null
                }
                {this.state.reviews.length > 0 ?
                    this.state.reviews.map((review, index) => {
                        return (
                            <div className="cover" key={index}>
                                <div className="row reviews-content">
                                    <div className="col-1"><span className="title">{index + 1}</span></div>
                                    <div className="col-3"><span className='title'>{review.name}</span></div>
                                    <div className="col-3"><span className='title'>{review.time_period_from}</span></div>
                                    <div className="col-3"><span className='title'>{review.time_period_to}</span></div>
                                    <div className="col-1"><span className='title edit' onClick={() => {
                                        this.review = review;
                                        this.forceUpdate();
                                    }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></span></div>
                                    <div className="col-1"><span className='title delete' onClick={() => this.delete(review.id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span></div>
                                </div>
                            </div>
                        )
                    }) :
                    <div className="emptyRevs">
                        <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                        <h5>No Data Found</h5>
                    </div>
                }
                <br />
                {this.state.reviews.length > 0 ?
                    <div>
                        <div className="pages">
                            <button className="left btn btn-light">{'<'}</button>
                            <button className="num btn btn-light">1</button>
                            <button className="right btn btn-light">{'>'}</button>
                        </div>
                        <div className="goto">
                            <span>Goto</span><input className="form-control" type="numbers" name="" />
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}

export default Reviews;