import React, { Component } from 'react';

import {BrowserRouter, Switch ,Route } from 'react-router-dom';
import AdminMain from './components/AdminMain';
import Login from './components/Login';
import Projects from './components/Projects';
import NewProject from './components/NewProject';
import Employees from './components/Employees';
import Employee from './components/Employee';
import Efforts from './components/Efforts';
import NewEffort from './components/NewEffort';

class Router extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/adminmain' component={AdminMain}/>
              <Route path='/projects' component={Projects}/>
              <Route path='/employees' component={Employees}/>
              <Route path='/newproject' component={NewProject}/>
              <Route path='/employee' component={Employee}/>
              <Route path='/manageEfforts' component={Efforts}/>
              <Route path='/neweffort' component={NewEffort}/>
          </Switch>
       </BrowserRouter>
    );
  }
}

export default Router;