import React from 'react';
import {Switch,Route} from 'react-router-dom';
import CompanyObj from './CompanyObj';
import DepartmentObj from './DepartmentObj';
import EmployeeObj from './EmployeeObj';

class Objectives extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/home/objectives/company' exact component={CompanyObj}></Route>
                <Route path='/home/objectives/department' exact component={DepartmentObj}></Route>
                <Route path='/home/objectives/employee' exact component={EmployeeObj}></Route>
            </Switch>
        )
    }
}
export default Objectives;