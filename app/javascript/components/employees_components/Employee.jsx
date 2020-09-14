import React from 'react';
import Employees from './Employees';
import AddEmployee from './AddEmployee';
import { Switch, Route } from 'react-router-dom';
class Employee extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/employee/' exact component={Employees}></Route>
                <Route path='/home/employee/add' exact component={(props) => <AddEmployee {...props}></AddEmployee>}></Route>
            </Switch>
        );
    }
}
export default Employee;