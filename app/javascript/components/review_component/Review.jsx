import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Reviews from './Reviews';
import AddReview from './AddReview';

class Review extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/review' exact component={Reviews}></Route>
                <Route path='/home/review/add' exact component={AddReview}></Route>
            </Switch>
        )
    }
}
export default Review;