import React from 'react';
import '../../../styles/Admin/Reviews/Reviews.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

class Reviews extends React.Component {
    review = null;
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        };
    }
    delete = (e) => {
        const url = "/api/v1/reviews/destroy";
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
                this.getData();
            })
            .catch(error => console.log(error.message));
    }
    componentDidMount() {
        this.getData();
    }
    getData=()=>{
        const url = "/api/v1/reviews/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.setState({ reviews: response })
                console.log(this.state.reviews);
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
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
                                    <div className="col-3"><span className='title'>{review.rname}</span></div>
                                    <div className="col-3"><span className='title'>{review.tpfrom}</span></div>
                                    <div className="col-3"><span className='title'>{review.tpto}</span></div>
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
                {/* <div className="cover">
                    <div className="row reviews-content">
                        <div className="col-1"><span className="title">1</span></div>
                        <div className="col-3"><span className='title'>Q1</span></div>
                        <div className="col-3"><span className='title'>01-06-2020</span></div>
                        <div className="col-3"><span className='title'>30-09-2020</span></div>
                        <div className="col-1"><span className='title edit'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></span></div>
                        <div className="col-1"><span className='title delete'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span></div>
                    </div>
                </div> */}
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