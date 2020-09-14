import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import Roles from './Roles';
import AddRole from './AddRole';

class Role extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/role' exact component={Roles}></Route>
                <Route path='/home/role/add' exact component={AddRole}></Route>
            </Switch>
        )
    }
}
export default Role;