import React from 'react';
import Departments from './Departments';
import AddDepartment from './AddDepartment';
import { Switch, Route } from 'react-router-dom';
class Department extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/department/' exact component={Departments}></Route>
                <Route path='/home/department/add' exact component={(props) => <AddDepartment {...props}></AddDepartment>}></Route>
            </Switch>
        );
    }
}
export default Department;