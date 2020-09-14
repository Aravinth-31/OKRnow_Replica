import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Functions from './Functions';
import AddFunc from './AddFunc';

class Function extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/function/' exact component={Functions}></Route>
                <Route path='/home/function/add' exact component={AddFunc}></Route>
            </Switch>
        );
    }
}

export default Function;