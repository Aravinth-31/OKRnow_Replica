import React from 'react';
import Teams from './Teams';
import AddTeam from './AddTeam';
import { Switch, Route } from 'react-router-dom';
class Team extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home/team/' exact component={Teams}></Route>
                <Route path='/home/team/add' exact component={AddTeam}></Route>
            </Switch>
        );
    }
}
export default Team;