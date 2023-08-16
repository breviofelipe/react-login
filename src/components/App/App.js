import React from 'react';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginHacker from '../Login/HackerLogin';

function Login() {
  return (
    <div className="wrapper">
      <LoginHacker />
      <BrowserRouter>
        <Switch>
            <Route path="/dashboard" >             
                <Dashboard />
            </Route>
            <Route path="/preferences">
                <Preferences />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Login;