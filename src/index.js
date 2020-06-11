import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configure } from "mobx";
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUsers from './components/ListUsers';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

configure({
    enforceActions: 'observed'
});

const Main = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={ListUsers}/>
      <Route path='/create' component={CreateUser} />
      <Route path='/edit/:userID' component={EditUser} />
      <Route component={ListUsers}/>
    </Switch>
);
};


// ========================================

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('root')
);
